"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/aut.routes.js"
import userRoutes from "../src/usuario/usuario.routes.js"
import categoriaRoutes from "../src/categoria/categoria.routes.js"
import productosRoutes from "../src/producto/producto.routes.js"
import carritoRoutes from "../src/carrito/carrito.routes.js"
import { categoriaDefault } from "../src/categoria/categoria.controller.js"
import { swaggerDocs, swaggerUi } from "./swagger.js";

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = (app) =>{
    app.use("/gestionDeVentas/v1/auth", authRoutes)
    app.use("/gestionDeVentas/v1/user", userRoutes)
    app.use("/gestionDeVentas/v1/categoria", categoriaRoutes)
    app.use("/gestionDeVentas/v1/productos", productosRoutes)
    app.use("/gestionDeVentas/v1/carrito", carritoRoutes)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        categoriaDefault()
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}