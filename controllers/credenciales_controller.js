import Usuario from "../models/Usuario.js";
import { correoRegistro } from "../helpers/correos.js";
import { check } from "express-validator";

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
    if (!valido.isEmpty()) {
        return res.render("credenciales/registrar", {
            pagina: "Alta Usuario",
            csrf: req.csrfToken(),
            errores: valido.array(),
        });
    }

    const usuario = await Usuario.create({
        username: req.body.username,
        apellido_paterno: req.body.apellido_paterno,
        apellido_paterno: req.body.apellido_materno,
        telefonoUsuario: req.body.telefonoUsuario,
        email: req.body.email,
        passwd: req.body.passwd
    });
    await usuario.save();

    //mandar correo
    correoRegistro({
        nombre: usuario.nombre,
        correo: usuario.correo,
        token: usuario.token,
    });
    res.render("credenciales/confirmacion.pug", {
        //revisa tu correo de confirmacion
        csrf: req.csrfToken(),
    })
}

const confirmarRegistroPorEnlace = async (req, res) => {
    const { token } = req.params;
    //token valido
    const usuario = await Usuario.findOne({
        where: { token }
    });

    if (!usuario) {
        res.render("credenciales/confirmado.pug", {
            titulo: "Autenticacion fallida",
            mensaje: "No se pudo confirmar tu cuenta, intenta de nuevo"
        })
    }

    // confirmar la cuenta del usuario

    usuario.token = null;
    usuario.confirmar = true;

    await usuario.save();
    res.render("credenciales/confirmar", {
        titulo: "Su cuenta confirmo exitosamente",
        mensaje: "Felicidades el registro se termino exitosamente",
        enlace: "salto"
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

//modificar todo
const credenciales = async (req, res) => {
    let valido = await validacionFormularioInicio(req);
    if (!valido.isEmpty()) {
      return res.render("credenciales/login", {
        pagina: "Alta Usuario",
        csrf: req.csrfToken(),
        errores: valido.array(),
      });
    }
    //comprobar si el usuario existe
    const { correo, password } = req.body;
    const us = await Usuario.findOne({ where: { correo } });
    if (!us) {
      return res.render("credenciales/login", {
        pagina: "Alta Usuario",
        csrf: req.csrfToken(),
        errores: [{ msg: "El usuario no existe" }],
      });
    }
    //comprobar si el usuario esta confirmado
    if (!us.confirmar) {
      return res.render("credenciales/login", {
        pagina: "Alta Usuario",
        csrf: req.csrfToken(),
        errores: [{ msg: "Tu cuenta no tiene confirmación, revisa tu correo" }],
      });
    }
    //comprobando el password
    if (!us.verificandoClave(password)) {
      return res.render("credenciales/login", {
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
      .redirect("/hotel/mostrarHotel");
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