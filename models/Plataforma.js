import { Sequelize } from "sequelize";
import db from "../config/db.js";

export const Plataforma = db.define (
    "plataforma", {
        platform_id: {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    },
    {timestamps: false}
);

export default Plataforma;