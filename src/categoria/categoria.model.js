import { Schema, model } from "mongoose";

const categoriaSchema = new Schema({
    nombre:{
        type: String,
        required: [true, "Nombre es requerido"]
    },
    descripcion:{
        type: String,
        required: true
    },
    productos:[{
        type: Schema.Types.ObjectId,
        ref: "Producto",
        default: []
    }],
    status:{
        type: Boolean,
        default: true
    }
});

categoriaSchema.methods.toJSON = function() {
    const { __v, _id, ...categoria } = this.toObject();
    categoria.uid = _id; 
    return categoria;
};

export default model("Categoria", categoriaSchema);
