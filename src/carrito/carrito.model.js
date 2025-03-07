import { Schema, model } from "mongoose";

const carritoSchema = new Schema({
    usuario:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    total:{
        type: Number,
        required: true
    },
    productos:[{
        type: String,
        required: true
    }],
    status:{
        type: Boolean,
        default: true
    }
});

carritoSchema.methods.toJSON = function() {
    const { __v, _id, ...carrito } = this.toObject();
    carrito.uid = _id; 
    return carrito;
};

export default model("Carrito", carritoSchema);
