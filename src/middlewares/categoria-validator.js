import { body, param  } from "express-validator";
import { categoriaExist , productoExist} from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const crearCategoriaValidator = [
    validateJWT,
    hasRoles("admin"),
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    validarCampos,
    handleErrors
]

export const agregarProductosValidator = [
    validateJWT,
    hasRoles("admin"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(categoriaExist),
    body("productos").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("productos").custom(productoExist),
    validarCampos,
    handleErrors
]

export const buscarCategoriaValidator = [
    validateJWT,
    hasRoles("admin"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(categoriaExist),
    validarCampos,
    handleErrors
]

export const borrarCategoriaValidator = [
    validateJWT,
    hasRoles("admin"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(categoriaExist),
    validarCampos,
    handleErrors
]

export const actualizarCategoriaValidator = [
    validateJWT,
    hasRoles("admin"),
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(categoriaExist),
    validarCampos,
    handleErrors
]

