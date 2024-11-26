import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import csrfMiddleware from "./middleware/csrfMiddleware.js"; // Middleware de CSRF
import db from "./config/db.js";
import dotenv from "dotenv";

import routerInicio from "./routes/inicio_router.js";
import usuario_router from "./routes/usuario_router.js";
import credenciales_router from "./routes/credenciales_router.js";
import carrito_router from "./routes/carrito_router.js";

dotenv.config(); // Carga variables de entorno

// Conexión a la base de datos
try {
    await db.authenticate();
    console.log("Conexión exitosa a la base de datos");
} catch (error) {
    console.error("Error al conectar a la base de datos:", error);
}

// Crear aplicación
const app = express();

// Configurar sesiones
app.use(
    session({
        secret: process.env.SESSION_SECRET || "secreto",
        resave: false,
        saveUninitialized: false,
    })
);

// Middleware para cookies
app.use(cookieParser());

// Acceso a los datos de formularios
app.use(express.urlencoded({ extended: true }));

// Configurar motor de plantillas
app.set("view engine", "pug");
app.set("views", "./views");

// Configurar carpeta pública
app.use(express.static("public"));

// Middleware de CSRF
csrfMiddleware(app);

// Configurar rutas
app.use("/", routerInicio);
app.use("/usuario", usuario_router);
app.use("/credenciales", credenciales_router);
app.use("/carrito", carrito_router);

// Manejo de errores globales (opcional)
app.use((err, req, res, next) => {
    console.error("Error global:", err.message);
    res.status(500).send("Algo salió mal en el servidor.");
});

// Definir puerto
const PORT = process.env.PORT || 2800;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
