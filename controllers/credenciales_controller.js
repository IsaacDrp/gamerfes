import Usuario from "../models/Usuario.js";
import { correoRegistro } from "../helpers/correos.js";
import { check, validationResult} from "express-validator";
import { idGenera, JWTGenera} from "../helpers/tokens.js";

export const renderRegisterPage = (req, res) => {
    res.render("crud_usuario/registro.pug", {
        csrf: req.csrfToken(),
    });
};

export const renderLoginPage = (req, res) => {
    res.render("crud_usuario/login.pug", {
        csrf: req.csrfToken(),
    });
}

export const registrar = async (req, res) => {

    let valido = await validacionFormulario(req);
    if (!valido.isEmpty()) { // espero jamas se llegue aqui xd
        return res.render("crud_usuario/registro.pug", {
            csrf: req.csrfToken(),
            errores: valido.array(),
        });
    }

    const usuario = await Usuario.create({
        username: req.body.username,
        apellido_paterno: req.body.apellido_paterno,
        apellido_materno: req.body.apellido_materno,
        telefonoUsuario: req.body.telefonoUsuario,
        email: req.body.email,
        passwd: req.body.passwd,
        role_id: 1, //rol de usuario por defecto
        //Generar token
        token: idGenera()
    });
    
    await usuario.save();

    //mandar correo
    correoRegistro({
        nombre: usuario.username,
        correo: usuario.email,
        token: usuario.token,
    });
    res.render("crud_usuario/confirmacion.pug", { //crear
        titulo: "Cuenta generada con exito!!",
        mensaje: "Solo falta un paso mas, por favor revisa tu correo para confirmar la cuenta y asi puedas usarla",
        endpoint: "/",
        tituloBoton: "Pagina principal",
        csrf: req.csrfToken(),
    })
}

export const confirmarRegistroPorEnlace = async (req, res) => {
    const { token } = req.params;
    //token valido
    const usuario = await Usuario.findOne({
        where: { token }
    });

    if (!usuario) {
        res.render("crud_usuario/confirmacion.pug", {
            titulo: "Autenticacion fallida",
            mensaje: "No se pudo confirmar tu cuenta, intenta de nuevo",
            endpoint: "/",
            tituloBoton: "Pagina principal"
        })
    }

    // confirmar la cuenta del usuario

    usuario.token = null;
    usuario.confirmar = true;

    await usuario.save();
    res.render("crud_usuario/confirmacion", {
        titulo: "Su cuenta confirmo exitosamente!!",
        mensaje: "Felicidades el registro se termino exitosamente.",
        endpoint: "/credenciales/login",
        tituloBoton: "Acceder"
    })

}

async function validacionFormulario(req) {
    await check("username")
        .notEmpty()
        .withMessage("Usuario no debe ser vacio")
        .run(req);
    await check("apellido_paterno")
        .notEmpty()
        .withMessage("Este campo no debe ser vacio")
        .run(req);
    await check("apellido_materno")
        .notEmpty()
        .withMessage("Este campo no debe ser vacio")
        .run(req);
    await check("telefonoUsuario")
        .notEmpty()
        .withMessage("Este campo es obligatorio")
        .run(req)
    await check("passwd")
        .notEmpty()
        .withMessage("Clave no debe ser vacio")
        .run(req);
    await check("email")
        .notEmpty()
        .withMessage("Correo no debe ser vacio")
        .run(req);
    let salida = validationResult(req);
    return salida;
}


export const credenciales = async (req, res) => {
    let valido = await validacionFormularioInicio(req);
    if (!valido.isEmpty()) {
      return res.render("crud_usuario/login.pug", {
        csrf: req.csrfToken(),
        errores: valido.array(),
      });
    }
    //comprobar si el usuario existe
    const email = req.body.email
    const passwd = req.body.passwd
    const us = await Usuario.findOne({ where: { email } });
    if (!us) {
      return res.render("crud_usuario/login.pug", {
        csrf: req.csrfToken(),
        errores: [{ msg: "El usuario no existe" }],
      });
    }
    //comprobar si el usuario esta confirmado
    if (!us.confirmar) {
      return res.render("crud_usuario/login.pug", {
        csrf: req.csrfToken(),
        errores: [{ msg: "Tu cuenta no tiene confirmación, revisa tu correo" }],
      });
    }
    //comprobando el password
    if (!us.verificandoClave(passwd)) {
      return res.render("crud_usuario/login.pug", {
        pagina: "Alta Usuario",
        csrf: req.csrfToken(),
        errores: [{ msg: "Credenciales no validas" }],
      });
    }
  
    const token = JWTGenera(us);
    console.log(us);
    console.log(token);

    //crean jsonwebtoken
    return res
      .cookie("_token", token, {
        httpOnly: true,
        //maxAge:60*1000
        //secure:true
      })
      .cookie("userEmail", email, {
        httpOnly: true, // Hace que la cookie sea accesible solo desde el servidor
        // secure: true, // Descomenta si usas HTTPS
        //maxAge: 24 * 60 * 60 * 1000, // Expiración de la cookie (1 día)
      })
      .redirect("/usuario/infousuario");
  };

async function validacionFormularioInicio(req) {
    await check("email")
        .notEmpty()
        .withMessage("El correo no debe ser vacio")
        .run(req);
    await check("passwd")
        .notEmpty()
        .withMessage("Clave no debe ser vacio")
        .run(req);
    let salida = validationResult(req);
    return salida;
}

export default {
    credenciales,
    confirmarRegistroPorEnlace,
    renderRegisterPage,
    renderLoginPage,
    registrar
}