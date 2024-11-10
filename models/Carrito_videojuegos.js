import { Sequelize } from "sequelize";
import db from "../config/db.js"

export const Carrito_videojuegos = db.define(
    "carrito_videojuegos", {
        cart_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        game_platform: {
            type: Sequelize.INTEGER
        }
    }
);