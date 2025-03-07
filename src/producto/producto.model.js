import { Schema, model } from "mongoose";

const productoSchema = new Schema({
    nombre:{
        type: String,
        required: [true, "Nombre es requerido"],
    },
    precio: {
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        default: 0
    },
    vecesComprado:{
        type: Number,
        default: 0
    },
    status:{
        type: Boolean,
        default: true
    }
});

productoSchema.methods.toJSON = function() {
    const { __v, _id, ...producto } = this.toObject();
    producto.uid = _id; 
    return producto;
};

export default model("Producto", productoSchema);
