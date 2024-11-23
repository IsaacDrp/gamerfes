import { Sequelize } from "sequelize";
import db from "../config/db.js";

export const Videojuego = db.define(
    "videojuegos",
    {
        game_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
        },
        release_date: {
            type: Sequelize.DATE,
        },
    },
    { timestamps: false }
);

export default Videojuego;
