import { hash } from "argon2";
import Categoria from "../categoria/categoria.model.js"

export const crearCategoria = async(req,res) =>{
    try{
        const data = req.body

        const categoria = await Categoria.create(data)

        return res.status(201).json({
            message: "Categoria creada con Exito",
            categoria
        })

    }catch(err){
        return res.status(500).json({
                    message: "A fallado el registro de la categoria",
                    error: err.message
        })
    }
}

export const categoriaDefault = async () => {
    try {
        const categoriaExistente = await Categoria.findOne({ nombre: "Default" });

        if (categoriaExistente) {
            console.log("Ya existe una categoría por defecto");
            return;
        }

        const categoria = new Categoria({
            nombre: "Default",
            descripcion: "Categoría predeterminada para productos",
        });

        await categoria.save();

        console.log("Categoría por defecto creada con éxito");
    } catch (err) {
        console.error("Ha fallado el registro de la categoría por defecto:", err.message);
    }
};


export const agregarProductoACategoria = async (req, res) => {
    try {
        const { uid } = req.params;
        const { productos } = req.body;  

        if (!Array.isArray(productos)) {
            return res.status(400).json({ message: "El campo productos debe ser un array" });
        }

        const categoria = await Categoria.findById(uid);

        if (!categoria) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        const productosExistentes = categoria.productos.map(prod => prod.toString());

        const productosRepetidos = productos.some(prod => productosExistentes.includes(prod.toString()));

        if (productosRepetidos) {
            return res.status(400).json({ message: "No pueden haber productos repetidos" });
        }

        const categoriaActualizada = await Categoria.findByIdAndUpdate(
            uid,
            { $push: { productos: { $each: productos } } },
            { new: true }
        );

        return res.status(201).json({
            success: true,
            message: "Se ha agregado con éxito",
            data: categoriaActualizada
        });

    } catch (err) {
        return res.status(500).json({
            message: "Ha fallado el registro del producto",
            error: err.message
        });
    }
};



export const buscarCategoria = async (req, res) => {
    try{
        const { uid } = req.params;
        const categoria = await Categoria.findById(uid)

        if(!uid){
            return res.status(404).json({
                success: false,
                message: "Categoria no encontrada"
            })
        }

        return res.status(200).json({
            success: true,
            categoria
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener la categoria",
            error: err.message
        })
    }
}

export const listarCategoria = async (req, res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, categoria ] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            categoria
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener las categorias",
            error: err.message
        })
    }
}


export const borrarCategoria = async (req, res) => {
    try {
        const { uid } = req.params;
        
        const categoria = await Categoria.findById(uid);

        if (!categoria) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada"
            });
        }

        const categoriaPorDefecto = await Categoria.findOne({ nombre: "Default" });

        if (!categoriaPorDefecto) {
            return res.status(404).json({
                success: false,
                message: "Categoría por defecto no encontrada"
            });
        }

        categoriaPorDefecto.productos.push(...categoria.productos);

        await categoriaPorDefecto.save();

        categoria.productos = [];

        categoria.status = false;

        await categoria.save();

        return res.status(200).json({
            success: true,
            message: "Categoría eliminada, productos transferidos y productos vaciados",
            categoria
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la categoría",
            error: err.message
        });
    }
};


export const actualizarCategoria = async (req, res) => {
    try {
        const { uid } = req.params;
        const  data  = req.body;

        const categoria = await Categoria.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Categoria Actualizada',
            categoria,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar Categoria',
            error: err.message
        });
    }
}