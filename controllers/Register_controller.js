import { Usuario } from "../models/Usuario.js";


async function register(req, res) {
    // Extraer los datos del formulario de registro del cuerpo de la solicitud
    const { username, apellido_paterno, apellido_materno, email, passwd, role_id } = req.body;
  
    try {
      // Crear un nuevo usuario en la base de datos con los datos recibidos
      const nuevoUsuario = await Usuario.create({
        username,
        apellido_paterno,
        apellido_materno,
        email,
        passwd, // Asegúrate de cifrar la contraseña antes de guardarla
        role_id
      });
  
      // Redirigir a la página principal o enviar un mensaje de éxito
      res.render('login/register.pug', {
        message: "Registro exitoso",
        usuario: nuevoUsuario // Opcional: puedes enviar los datos del usuario registrado a la vista
      });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      // Renderiza la página de registro con un mensaje de error
      res.render('login/register.pug', {
        message: "Error al registrar usuario",
        error
      });
    }
  }
  
  async function showRegister(req,res) {
    res.render('login/register.pug')
  }
  export { register, showRegister};