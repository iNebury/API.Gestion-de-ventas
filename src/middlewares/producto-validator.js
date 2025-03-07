import { body, param  } from "express-validator";
import { productoExist} from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const crearProductoValidator = [
    validateJWT,
    hasRoles("admin"),
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    validarCampos,
    handleErrors
]

export const buscarProductoValidator = [
    validateJWT,
    hasRoles("admin"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(productoExist),
    validarCampos,
    handleErrors
]

export const borrarProductoValidator = [
    validateJWT,
    hasRoles("admin"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(productoExist),
    validarCampos,
    handleErrors
]

export const actualizarProductoValidator = [
    validateJWT,
    hasRoles("admin"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(productoExist),
    validarCampos,
    handleErrors
]


