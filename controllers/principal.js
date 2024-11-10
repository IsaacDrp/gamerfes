import { Model } from "sequelize";
import Videojuego from "../models/Videojuegos.js";

async function principal (req, res) {
  let videojuegos = await Videojuego.findAll({
    Include :{
      Model : Videojuego
    },
    raw : true,
    nest : true
  });
  res.render('principal', {
    videojuego : videojuegos
  })
}

export { principal };
  