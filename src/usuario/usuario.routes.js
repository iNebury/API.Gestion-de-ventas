import { Router } from "express"
import { getUserById, getUsers, deleteUser,  updateUser, getUserHistory } from "./usuario.controller.js"
import { deleteUserValidator, updateUserValidator} from "../middlewares/usuario-validator.js"

const router = Router()

/**
 * @swagger
 * /api/users/findUser/{uid}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/findUser/:uid", getUserById);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios activos
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Número de usuarios a mostrar
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Número de usuarios a omitir
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *       500:
 *         description: Error del servidor
 */
router.get("/", getUsers);

/**
 * @swagger
 * /api/users/deleteUser/{uid}:
 *   patch:
 *     summary: Desactivar un usuario
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario desactivado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.patch("/deleteUser/:uid", deleteUserValidator, deleteUser);

/**
 * @swagger
 * /api/users/updateUser/{uid}:
 *   patch:
 *     summary: Actualizar la información de un usuario
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *       - in: body
 *         name: userData
 *         description: Datos a actualizar
 *         required: true
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.patch("/updateUser/:uid", updateUserValidator, updateUser);

router.get("/historial/:uid",getUserHistory)

export default router