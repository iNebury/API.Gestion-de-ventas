import { Router } from "express"
import { register, login} from "./auth.controller.js"
import { registerValidator, loginValidator } from "../middlewares/usuario-validator.js"

const router = Router()

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/register", registerValidator, register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error del servidor
 */
router.post("/login", loginValidator, login);


export default router