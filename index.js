import express from "express";
//import session from "express-session";
import router_principal from "./routes/principal_router.js";
import db from "./config/db.js";

// creamos la aplicacion
const app = express();

//soporte para sesiones de express
//app.use(session({secret:'secreto', resave: false, saveUninitialized : false}));


//soporte para pug
app.set("view engine","pug");
app.set("views","./views");

// Carpeta publica
app.use(express.static("public"));

// Routing
app.use("/", router_principal);

// Direccion ip y puerto
const port    = '6123';

app.listen(port, () =>{
    console.log(`Esperando peticiones en el puerto ${port}`);
})

// Conexion a la base de datos

try{
    await db.authenticate();
    console.log("Conexion exitosa a la base de datos");
} catch(error){
    console.log(error);
}