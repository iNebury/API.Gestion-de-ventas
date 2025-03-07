import { hash } from "argon2";
import Producto from "../producto/producto.model.js"


export const crearproducto = async(req,res) =>{
    try{
        const data = req.body

        const producto = await Producto.create(data)

        
        return res.status(201).json({
            message: "Prodcuto creado con Exito",
            producto
        })

    }catch(err){
        return res.status(500).json({
                    message: "A fallado el registro del producto",
                    error: err.message
                })
    }
}

export const buscarProducto = async (req, res) => {
    try{
        const { uid } = req.params;
        const producto = await Producto.findById(uid)

        if(!uid){
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            producto
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el producto",
            error: err.message
        })
    }
}

export const listarProducto = async (req, res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, producto ] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            producto
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: err.message
        })
    }
}

export const borrarProducto = async (req, res) => {
    try{
        const { uid } = req.params
        
        const producto = await Producto.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Producto eliminado",
            producto
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el Producto",
            error: err.message
        })
    }
}

export const actualizarproducto = async (req, res) => {
    try {
        const { uid } = req.params;
        const  data  = req.body;

        const producto = await Producto.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'producto Actualizada',
            producto,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar producto',
            error: err.message
        });
    }
}

export const listarProductoMasVendidos = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };

        const [total, productos] = await Promise.all([
            Producto.countDocuments(query), 
            Producto.find(query)
                .sort({ vecesComprado: -1 }) 
                .skip(Number(desde))         
                .limit(Number(limite))      
        ]);

        return res.status(200).json({
            success: true,
            total,
            productos
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: err.message
        });
    }
};
