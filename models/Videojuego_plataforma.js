import Videojuego from "./Videojuegos.js";
import Plataforma from "./Plataforma.js";
import db from "../config/db.js";
import { Sequelize } from "sequelize";

export const Videojuego_plataforma = db.define (
    "videojuego_plataforma", {
        game_platform : {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        game_id: {
            type: Sequelize.INTEGER
        },
        platform_id: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.DECIMAL
        },
        stock: {
            type: Sequelize.INTEGER
        }
    }, {timestamps: false}
);

Videojuego.hasOne(Videojuego_plataforma, {
    foreignKey: {
        name: "game_id"
    }
});

Videojuego_plataforma.belongsTo(Videojuego,{
    foreignKey:{
        name:"game_id",
    },
});
Plataforma.hasOne(Videojuego_plataforma, {
    foreignKey: {
        name: "platform_id"
    }
});

Videojuego_plataforma.belongsTo(Plataforma,{
    foreignKey:{
        name:"platform_id",
    },
});

export default Videojuego_plataforma;