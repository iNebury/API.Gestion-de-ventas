import { Router } from "express"
import { crearproducto, listarProducto, buscarProducto, actualizarproducto,borrarProducto, listarProductoMasVendidos} from "./producto.controller.js"
import { crearProductoValidator,buscarProductoValidator,actualizarProductoValidator,borrarProductoValidator } from "../middlewares/producto-validator.js"

const router = Router()

/**
 * @swagger
 * /api/productos/crearProducto:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Producto]
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
 *         description: Producto creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/crearProducto/", crearProductoValidator, crearproducto);

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Listar todos los productos
 *     tags: [Producto]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *       500:
 *         description: Error del servidor
 */
router.get("/", listarProducto);

/**
 * @swagger
 * /api/productos/buscarProducto/{uid}:
 *   get:
 *     summary: Buscar un producto por su ID
 *     tags: [Producto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a buscar
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/buscarProducto/:uid", buscarProductoValidator, buscarProducto);

/**
 * @swagger
 * /api/productos/actualizarProducto/{uid}:
 *   patch:
 *     summary: Actualizar la información de un producto
 *     tags: [Producto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.patch("/actualizarProducto/:uid", actualizarProductoValidator, actualizarproducto);

/**
 * @swagger
 * /api/productos/borrarProducto/{uid}:
 *   patch:
 *     summary: Borrar un producto (desactivación lógica)
 *     tags: [Producto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a borrar
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.patch("/borrarProducto/:uid", borrarProductoValidator, borrarProducto);

/**
 * @swagger
 * /api/productos/listarMasVendidos:
 *   get:
 *     summary: Listar los productos más vendidos
 *     tags: [Producto]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos más vendidos obtenida exitosamente
 *       500:
 *         description: Error del servidor
 */
router.get("/listarMasVendidos", listarProductoMasVendidos);


export default router