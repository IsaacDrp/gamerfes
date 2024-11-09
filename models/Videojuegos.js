import { Sequelize } from "sequelize";
import db from "../config/db.js";


export const Videojuego = db.define (
    "videojuegos",{
        game_id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        release_date: {
            type: Sequelize.STRING
        },
        image_src: {
            type: Sequelize.STRING
        }
    },
    {timestamps: false}
);

export default Videojuego;