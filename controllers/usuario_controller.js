import Usuario from "../models/Usuario.js";

// Función para renderizar la página de usuario
export const renderUserPage = (req, res) => {
    res.render("usuario.pug");
};

export const renderForms = (req, res) => {
    const { id } = req.params;
    switch (id) {
      case "colapso1":
        res.render("formularios/usuario.pug");
        break;
      case "colapso2":
        res.render("formularios/domicilio.pug");
        break;
      case "colapso3":
        res.render("formularios/agregarDomicilio.pug");
        break;
      case "colapso4":
        res.render("formularios/verTarjetas.pug");
        break;
      case "colapso5":
        res.render("formularios/agregarTarjeta.pug");
        break;
      default:
        res.status(404).send("Formulario no encontrado");
    }
  }

export default {
    renderUserPage,
    renderForms,
}