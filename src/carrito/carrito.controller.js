import { hash } from "argon2";
import Carrito from "../carrito/carrito.model.js"
import Producto from "../producto/producto.model.js"
import mongoose from "mongoose";
import User from "../usuario/usuario.model.js"
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';

export const crearCarrito = async (req, res) => {
    try {
        const data = req.body;
        let total1 = 0;
        for (let i = 0; i < data.productos.length; i++) {
            if (!mongoose.Types.ObjectId.isValid(data.productos[i])) {
                return res.status(400).json({ message: `ID de producto inválido: ${data.productos[i]}` });
            }

            const producto = await Producto.findById(data.productos[i]);
            console.log(`Producto obtenido: ${producto}`);

            if (producto) {
                total1 += producto.precio;
            } else {
                return res.status(404).json({
                    message: `Producto con ID ${data.productos[i]} no encontrado`
                });
            }
        }
        data.total = total1;
        const carrito = await Carrito.create(data);

        return res.status(201).json({
            message: "Carrito creado con éxito",
            carrito
        });

    } catch (err) {
        return res.status(500).json({
            message: "Ha fallado la creación del carrito",
            error: err.message
        });
    }
};




export const actualizarCarrito = async (req, res) => {
    try {
        const { uid } = req.params;  
        const { agregarProducto, eliminarProducto } = req.body;

        const carrito = await Carrito.findById(uid);

        if (!carrito) {
            return res.status(404).json({
                success: false,
                message: "Carrito no encontrado"
            });
        }

        if (agregarProducto && agregarProducto.length > 0) {
            for (let prod of agregarProducto) {
                await Carrito.updateOne(
                    { _id: uid },
                    { $push: { productos: prod } }
                );
            }
        }

        if (eliminarProducto && eliminarProducto.length > 0) {
            for (let prod of eliminarProducto) {
                await Carrito.updateOne(
                    { _id: uid },
                    { $pull: { productos: prod } }
                );
            }
        }

        let total1 = 0;
        const carritoActualizado = await Carrito.findById(uid); 

        for (let prodId of carritoActualizado.productos) {
            if (!mongoose.Types.ObjectId.isValid(prodId)) {
                return res.status(400).json({ message: `ID de producto inválido: ${prodId}` });
            }

            const producto = await Producto.findById(prodId);
            if (producto) {
                total1 += producto.precio;  
            } else {
                return res.status(404).json({
                    message: `Producto con ID ${prodId} no encontrado`
                });
            }
        }

        carritoActualizado.total = total1;
        await carritoActualizado.save();

        return res.status(201).json({
            success: true,
            message: "Productos agregados y/o eliminados con éxito",
            carrito: carritoActualizado
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Ha fallado la operación de agregar/eliminar productos",
            error: err.message
        });
    }
};

export const borrarCarrito = async (req, res) => {
    try {
        const { uid } = req.params;
        
        const carrito = await Carrito.findByIdAndDelete(uid);

        return res.status(200).json({
            success: true,
            message: "Carrito eliminado",
            carrito
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el carrito",
            error: err.message
        });
    }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const confirmarCarrito = async (req, res) => {
    try {
        const { uid } = req.params;

        const carrito = await Carrito.findById(uid);

        if (!carrito) {
            return res.status(404).json({
                success: false,
                message: "Carrito no encontrado"
            });
        }

        let productosDesglose = [];
        let total = 0;

        for (let prodId of carrito.productos) {
            const producto = await Producto.findById(prodId);

            if (producto) {
                productosDesglose.push({
                    nombre: producto.nombre,
                    cantidad: 1,
                    precioUnitario: producto.precio,
                    totalProducto: producto.precio
                });

                total += producto.precio;

                await Producto.findByIdAndUpdate(prodId, { $inc: { vecesComprado: 1 } });
            } else {
                return res.status(404).json({
                    success: false,
                    message: `Producto con ID ${prodId} no encontrado`
                });
            }
        }

        const historial = await User.findByIdAndUpdate(
            carrito.usuario,
            { $push: { historial: carrito._id } },
            { new: true }
        );

        await Carrito.findByIdAndUpdate(uid, { total: total });

        const facturaDir = path.join(__dirname, 'facturas');
        const facturaPath = path.join(facturaDir, `factura_${uid}.pdf`);

        if (!fs.existsSync(facturaDir)) {
            fs.mkdirSync(facturaDir);
        }

        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(facturaPath));

        doc.fontSize(20).text('Factura', { align: 'center' });

        doc.fontSize(12).text(`Número de Factura: ${uid}`, 50, 100);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 50, 120);
        doc.text(`Cliente: ${historial.nombre}`, 50, 140);
        doc.text(`Dirección: ${historial.direccion}`, 50, 160);

        doc.moveDown();

        doc.text('Descripción', 50, 200);
        doc.text('Cantidad', 300, 200);
        doc.text('Precio Unitario', 400, 200);
        doc.text('Total', 500, 200);

        doc.moveTo(50, 210).lineTo(550, 210).stroke();

        let yPosition = 220;
        productosDesglose.forEach(item => {
            doc.text(item.nombre, 50, yPosition);
            doc.text(item.cantidad.toString(), 300, yPosition);
            doc.text(`$${item.precioUnitario.toFixed(2)}`, 400, yPosition);
            doc.text(`$${item.totalProducto.toFixed(2)}`, 500, yPosition);
            yPosition += 20;
        });

        doc.moveTo(50, yPosition + 10).lineTo(550, yPosition + 10).stroke();

        doc.text(`Total: $${total.toFixed(2)}`, 400, yPosition + 30);

        doc.end();

        return res.status(200).json({
            success: true,
            message: "Carrito pagado",
            historial,
            desgloseProductos: productosDesglose,
            total: total,
            facturaPDF: `/carrito/faturas/factura_${uid}.pdf`  
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al pagar el carrito",
            error: err.message
        });
    }
};
