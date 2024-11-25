import Videojuego from "../models/Videojuegos.js";

export const renderMainPage = async (req, res) => {
  try {
      // Obtén los videojuegos desde la base de datos
      const juegos = await Videojuego.findAll();

      // Renderiza la vista con los datos obtenidos
      res.render("main.pug", {
          juegos, // Pasamos los juegos como variable a la vista
      });
  } catch (error) {
      console.error("Error al obtener los videojuegos:", error);
      res.status(500).send("Hubo un problema al cargar los videojuegos.");
  }
};


// Función para renderizar la página de usuario
export const renderUserPage = (req, res) => {
    res.render("usuario.pug", { juegos, paginas });
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

// Exportación de funciones
export default {
    renderMainPage,
    renderUserPage,
    renderForms,
};
