import { Router } from "express"
import { crearCategoria, agregarProductoACategoria, buscarCategoria, listarCategoria, borrarCategoria, actualizarCategoria } from "../categoria/categoria.controller.js"
import { crearCategoriaValidator,agregarProductosValidator,buscarCategoriaValidator, borrarCategoriaValidator,actualizarCategoriaValidator} from "../middlewares/categoria-validator.js"

const router = Router()

/**
 * @swagger
 * /api/categorias/crearCategoria:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categoría]
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
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/crearCategoria/", crearCategoriaValidator, crearCategoria);

/**
 * @swagger
 * /api/categorias/agregarProducto/{uid}:
 *   patch:
 *     summary: Agregar un producto a una categoría
 *     tags: [Categoría]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Producto agregado a la categoría exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 */
router.patch("/agregarProducto/:uid", agregarProductosValidator, agregarProductoACategoria);

/**
 * @swagger
 * /api/categorias/borrarCategoria/{uid}:
 *   patch:
 *     summary: Borrar una categoría (desactivación lógica)
 *     tags: [Categoría]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría a borrar
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 */
router.patch("/borrarCategoria/:uid", borrarCategoriaValidator, borrarCategoria);

/**
 * @swagger
 * /api/categorias/actualizarCategoria/{uid}:
 *   patch:
 *     summary: Actualizar información de una categoría
 *     tags: [Categoría]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 */
router.patch("/actualizarCategoria/:uid", actualizarCategoriaValidator, actualizarCategoria);

/**
 * @swagger
 * /api/categorias/buscarCategoria/{uid}:
 *   get:
 *     summary: Buscar una categoría por su ID
 *     tags: [Categoría]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría a buscar
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get("/buscarCategoria/:uid", buscarCategoriaValidator, buscarCategoria);

/**
 * @swagger
 * /api/categorias/listarCategorias:
 *   get:
 *     summary: Listar todas las categorías
 *     tags: [Categoría]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida exitosamente
 *       500:
 *         description: Error del servidor
 */
router.get("/listarCategorias", listarCategoria);


export default router