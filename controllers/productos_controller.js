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




// Exportación de funciones
export default {
    renderMainPage,
};
