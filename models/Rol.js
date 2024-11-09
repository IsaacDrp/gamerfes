import { Sequelize } from "sequelize";
import db from "../config/db";

export const Rol = db.define (
    "rol", {
        role_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        }
});