import User from "../usuario/usuario.model.js"
import Categoria from "../categoria/categoria.model.js"
import Producto from "../producto/producto.model.js"
import Carrito from "../carrito/carrito.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const categoriaExist = async (uid = " ") => {
    const existe = await Categoria.findById(uid)
    if(!existe){
        throw new Error("No existe la categoria con el ID proporcionado")
    }
}

export const productoExist = async (uid = " ") => {
    const existe = await Producto.findById(uid)
    if(!existe){
        throw new Error("No existe el producto con el ID proporcionado")
    }
}

export const carritoExist = async (uid = " ") => {
    const existe = await Carrito.findById(uid)
    if(!existe){
        throw new Error("No existe el Carrito con el ID proporcionado")
    }
}
