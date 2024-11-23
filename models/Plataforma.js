import { Sequelize } from "sequelize";
import db from "../config/db.js";

export const Plataforma = db.define(
    "plataformas",
    {
        platform_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
        },
    },
    { timestamps: false }
);

export default Plataforma;
