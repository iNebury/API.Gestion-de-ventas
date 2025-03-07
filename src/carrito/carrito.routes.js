import { Router } from "express"
import { crearCarrito, actualizarCarrito, borrarCarrito, confirmarCarrito} from "./carrito.controller.js"
import { crearCarritoValidator, actualizarCarritoValidator, borrarCarritoValidator } from "../middlewares/carrito-validator.js"

const router = Router()

/**
 * @swagger
 * /api/carrito/crearCarrito:
 *   post:
 *     summary: Crear un nuevo carrito de compras
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Carrito creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/crearCarrito/", crearCarritoValidator, crearCarrito);

/**
 * @swagger
 * /api/carrito/agregarProducto/{uid}:
 *   patch:
 *     summary: Agregar o eliminar productos del carrito
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Productos actualizados en el carrito exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Carrito no encontrado
 *       500:
 *         description: Error del servidor
 */
router.patch("/agregarProducto/:uid", actualizarCarritoValidator, actualizarCarrito);

/**
 * @swagger
 * /api/carrito/borrarCarrito/{uid}:
 *   delete:
 *     summary: Eliminar un carrito de compras
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del carrito a eliminar
 *     responses:
 *       200:
 *         description: Carrito eliminado exitosamente
 *       404:
 *         description: Carrito no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/borrarCarrito/:uid", borrarCarritoValidator, borrarCarrito);

/**
 * @swagger
 * /api/carrito/pagarCarrito/{uid}:
 *   patch:
 *     summary: Confirmar y pagar el carrito
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del carrito a pagar
 *     responses:
 *       200:
 *         description: Carrito pagado exitosamente
 *       404:
 *         description: Carrito no encontrado
 *       500:
 *         description: Error del servidor
 */
router.patch("/pagarCarrito/:uid", confirmarCarrito);


export default router