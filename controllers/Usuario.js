import { Usuario } from "../models/Usuario.js";

async function User(req,res) {  
    res.render('Usuario/usuario.pug',{}) 
}

export {User};