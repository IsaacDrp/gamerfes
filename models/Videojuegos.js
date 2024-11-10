import { Sequelize } from "sequelize";
import db from "../config/db.js";


export const Videojuego = db.define (
    "videojuego",{
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
    {
        timestamps: false,
        freezeTableName: true, // Evita la pluralización automática del nombre de la tabla
        tableName: "videojuegos",  // Especifica el nombre exacto de la tabla en la base de datos
    }
);

export default Videojuego;