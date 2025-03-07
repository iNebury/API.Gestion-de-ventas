import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Adoption System API",
            version: "1.0.0",
            description: "API de gestion de ventas online",
            contact:{
                name: "Diego Urias Rivas",
                email: "durias-2020292@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/gestionDeVentas/v1"
            }
        ]
    },
    apis:[
        "./src/auth/aut.routes.js",
        "./src/carrito/carrito.routes.js",
        "./src/categoria/categoria.routes.js",
        "./src/producto/producto.routes.js",
        "./src/usuario/usuario.routes.js",
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}