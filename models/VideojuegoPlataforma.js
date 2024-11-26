import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Videojuego from "./Videojuegos.js";
import Plataforma from "./Plataforma.js";

export const VideojuegoPlataforma = db.define(
    "videojuego_plataforma",
    {
        game_platform: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        stock: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },
    { 
        timestamps: false,
        freezeTableName : true
    }
);

Videojuego.hasMany(VideojuegoPlataforma, {
    foreignKey: { name: "game_id" },
});
Plataforma.hasMany(VideojuegoPlataforma, {
    foreignKey: { name: "platform_id" },
});
VideojuegoPlataforma.belongsTo(Videojuego, {
    foreignKey: { name: "game_id" },
});
VideojuegoPlataforma.belongsTo(Plataforma, {
    foreignKey: { name: "platform_id" },
});

export default VideojuegoPlataforma;
