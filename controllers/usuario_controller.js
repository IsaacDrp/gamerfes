import Usuario from "../models/Usuario.js";
import Domicilio from "../models/Domicilio.js";
import FormaPago from "../models/FormaPago.js"
import { format, parseISO } from "date-fns";
// Función para renderizar la página de usuario
export const renderUserPage = (req, res) => {
  res.render("usuario.pug", {
    csrf: req.csrfToken(),
  });
};


export const renderForms = (req, res) => {
  const { id } = req.params;
  switch (id) {
    case "colapso1":
      renderUserForm(req,res);
      break;
    case "colapso2":
      viewDom(req, res);
      break;
    case "colapso3":
      res.render("formularios/agregarDomicilio.pug", {
        csrf: req.csrfToken(),
      });
      break;
    case "colapso4":
      viewCards(req,res);
      break;
    case "colapso5":
      res.render("formularios/agregarTarjeta.pug", {
        csrf: req.csrfToken(),
      });
      break;
    default:
      res.status(404).send("Formulario no encontrado");
  }
}

const renderUserForm = (req, res) => {
  // Primero realizamos la consulta para obtener el usuario
  Usuario.findOne({ where: { email: req.cookies.userEmail } })
    .then(usuario => { // Aquí se obtiene el usuario desde la base de datos
      if (usuario) {
        // Definimos la variable para el rol del usuario
        let role = "";
        // Lógica para determinar el nombre del rol
        if (usuario.role_id == 1) role = "Usuario";
        else if (usuario.role_id == 2) role = "Empleado";
        else role = "Admin";
        // Luego renderizamos la vista y pasamos la información del usuario
        res.render("formularios/usuario.pug", {
          csrf: req.csrfToken(),
          user: {  // Nombre del objeto que pasamos a la vista
            username: usuario.username,
            apellidoPaterno: usuario.apellido_paterno,
            apellidoMaterno: usuario.apellido_materno,
            telefonoUsuario: usuario.telefonoUsuario,
            email: usuario.email,
            role_id: usuario.role_id,
            role_name: role // El nombre del rol determinado previamente
          }
        });
      } else {
        // Si no se encuentra el usuario
        res.status(404).send("Usuario no encontrado");
      }
    })
    .catch(err => {
      // Si ocurre un error en la consulta
      console.error("Error al obtener el usuario:", err);
      res.status(500).send("Error en el servidor");
    });
};

export const modify = async (req,res) =>{
  try {
    const { username, apellido_paterno, apellido_materno, telefonoUsuario } = req.body;

    // Encuentra el usuario por su nombre de usuario (ya que es único y readonly en el formulario)
    const usuario = await Usuario.findOne({ where: { username } });

    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }

    // Actualiza los datos del usuario con los nuevos valores
    usuario.apellido_paterno = apellido_paterno;
    usuario.apellido_materno = apellido_materno;
    usuario.telefonoUsuario = telefonoUsuario;

    await usuario.save();

    // Redirigir o enviar una respuesta exitosa
    res.redirect('/infousuario'); // Ajusta la ruta de redirección según tu aplicación
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
}

export const addDom = async (req, res) => {
  try {
    // Obtener el correo desde la cookie
    const email = req.cookies.userEmail;

    if (!email) {
      return res.status(400).send("No se encontró el correo en la cookie");
    }

    // Buscar el ID del usuario basado en el correo
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }

    const userId = usuario.user_id; // Asumimos que el modelo `Usuario` tiene el campo `user_id`

    // Obtener los datos del formulario
    const { estado, ciudad, codigoPostal, calle, colonia, numero } = req.body;

    // Insertar el domicilio en la base de datos
    const nuevoDomicilio = await Domicilio.create({
      estado,
      ciudad,
      codigoPostal,
      calle,
      colonia,
      numero,
      user_id: userId, // Asociar el domicilio al usuario
    });

    // Redirigir o enviar respuesta exitosa
    res.redirect('/usuario/infousuario')
  } catch (error) {
    console.error("Error al agregar domicilio:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const viewDom = async (req, res) => {
  try {
    // Obtener el correo desde la cookie
    const email = req.cookies.userEmail;

    if (!email) {
      return res.status(400).send("No se encontró el correo en la cookie");
    }

    // Buscar el ID del usuario basado en el correo
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }

    const userId = usuario.user_id; // Asumimos que el modelo `Usuario` tiene el campo `user_id`

    // Buscar los domicilios asociados al usuario
    const domicilios = await Domicilio.findAll({ where: { user_id: userId } });

    // Renderizar la vista con los domicilios encontrados
    res.render("formularios/domicilio.pug", {
      domicilios, // Lista de domicilios
      csrf: req.csrfToken(), // Token CSRF para proteger el formulario
    });
  } catch (error) {
    console.error("Error al obtener los domicilios:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const addCard = async (req, res) => {
  try {
    // Obtener el correo desde la cookie
    const email = req.cookies.userEmail;

    if (!email) {
      return res.status(400).send("No se encontró el correo en la cookie");
    }

    // Buscar el ID del usuario basado en el correo
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }

    const userId = usuario.user_id; // Asumimos que el modelo `Usuario` tiene el campo `user_id`

    // Obtener los datos del formulario
    const { tarjeta_tipo, card_number, fecha_vencimiento, cvv } = req.body;

    // Validar que los datos no estén vacíos
    if (!tarjeta_tipo || !card_number || !fecha_vencimiento || !cvv) {
      return res.status(400).send("Todos los campos son obligatorios");
    }

    // Insertar la tarjeta en la base de datos
    await FormaPago.create({
      user_id: userId,
      tarjeta_tipo,
      card_number,
      fecha_vencimiento,
      cvv,
    });

    // Redirigir o enviar respuesta exitosa
    res.redirect('/usuario/infousuario');
  } catch (error) {
    console.error("Error al agregar tarjeta:", error);
    res.status(500).send("Error interno del servidor");
  }
};

const viewCards = async (req, res) => {
  try {
    const email = req.cookies.userEmail;

    if (!email) {
      return res.status(400).send("No se encontró el correo en la cookie");
    }

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }

    const userId = usuario.user_id;

    const tarjetas = await FormaPago.findAll({ where: { user_id: userId } });

    // Verificar que la fecha de vencimiento sea un objeto Date
    const tarjetasConFechaCorrecta = tarjetas.map((tarjeta) => {
      // Verificar si la fecha_vencimiento ya es un objeto Date
      if (tarjeta.fecha_vencimiento instanceof Date) {
        // Si ya es un Date, se deja tal cual
        return tarjeta;
      } else {
        // Si no es un Date, convertirlo en uno (suponiendo que es una cadena válida)
        tarjeta.fecha_vencimiento = new Date(tarjeta.fecha_vencimiento);
        return tarjeta;
      }
    });

    // Pasar los domicilios a la vista sin formatear la fecha
    res.render("formularios/tarjetas.pug", {
      tarjetas: tarjetasConFechaCorrecta, // Pasamos las tarjetas con las fechas convertidas
      csrf: req.csrfToken(),
    });
  } catch (error) {
    console.error("Error al obtener las tarjetas:", error);
    res.status(500).send("Error interno del servidor");
  }
};


export default {
  renderUserPage,
  renderForms,
  modify,
  addDom
}