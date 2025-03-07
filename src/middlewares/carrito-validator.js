import { body, param  } from "express-validator";
import { carritoExist} from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";

export const crearCarritoValidator = [
    validateJWT,
    body("usuario").notEmpty().withMessage("El nombre es requerido"),
    body("usuario").isMongoId().withMessage("No es un id valido"),
    validarCampos,
    handleErrors
]

export const actualizarCarritoValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(carritoExist),
    validarCampos,
    handleErrors
]

export const borrarCarritoValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(carritoExist),
    validarCampos,
    handleErrors
]
