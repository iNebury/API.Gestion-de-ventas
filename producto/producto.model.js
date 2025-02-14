import { Schema, model } from "mongoose";

const productoSchema = new Schema({
    name:{
        type: String,
        required: [true, "Nombre del producto"],
        maxLength: [25, "El nombre no puede exceder los 25 caracteres"]
    },
    categoria:{
        type: String,
        required: [true, "Categoria del proscuto"],
    },
    descripcion:{
        type: String,
        required: [true,"Informacion sobre el producto"],
    },
    inventario:{
        type: String,
        required: [true, "Cantidad de productos que hay en Inventario/Stock"],
    },
    precio:{
        type: String,
        required: [true, "Costo/Valor del producto"]
    },
    status:{
        type: Boolean,
        default: true
    }
});

productoSchemaSchema.methods.toJSON = function() {
    const { __v, _id, ...producto } = this.toObject();
    producto.uid = _id; 
    return producto;
};

export default model("Producto", productoSchema);