import express from "express";
import session from "express-session";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import db from "./config/db.js";
import routerInicio from "./routes/inicio_router.js";
import usuario_router from "./routes/usuario_router.js";

// Conexión a la base de datos
try {
    await db.authenticate();
    console.log("Conexión exitosa a la base de datos");
} catch (error) {
    console.error("Error al conectar a la base de datos:", error);
}

// Crear aplicación
const app = express();

// Habilitar cookie-parser
app.use(cookieParser());

// Configurar CSRF globalmente
app.use(csrf({ cookie: true }));

// Configurar sesiones
app.use(
    session({
        secret: "secreto",
        resave: false,
        saveUninitialized: false,
    })
);

// Acceso a los datos de formularios
app.use(express.urlencoded({ extended: true }));

// Configurar motor de plantillas
app.set("view engine", "pug");
app.set("views", "./views");

// Configurar carpeta pública
app.use(express.static("public"));

// Configurar rutas
app.use("/", routerInicio);
app.use("/usuario", usuario_router);

// Definir puerto
const port = 2800;
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});
