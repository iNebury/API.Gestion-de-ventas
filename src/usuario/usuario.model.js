import { Schema, model } from "mongoose";

const usuarioSchema = new Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    userName:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    role:{
        type: String,
        enum: ["admin", "cliente"],
        default: "cliente"
    },
    status:{
        type: Boolean,
        default: true
    }
});

usuarioSchema.methods.toJSON = function() {
    const { __v, contrasena, _id, ...usuario } = this.toObject();
    usuario.uid = _id; 
    return usuario;
};

export default model("User", usuarioSchema);
