import { Sequelize } from "sequelize";
import db from "../config/db.js";

export const Rol = db.define(
    "roles",
    {
        role_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        descripcion: {
            type: Sequelize.TEXT,
        },
    },
    { timestamps: false }
);

export default Rol;
