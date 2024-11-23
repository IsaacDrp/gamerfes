import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Carrito from "./Carrito.js";
import VideojuegoPlataforma from "./VideojuegoPlataforma.js";

export const CarritoVideojuegos = db.define(
    "carrito_videojuegos",
    {
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },
    { timestamps: false }
);

Carrito.belongsToMany(VideojuegoPlataforma, {
    through: CarritoVideojuegos,
    foreignKey: { name: "cart_id" },
});
VideojuegoPlataforma.belongsToMany(Carrito, {
    through: CarritoVideojuegos,
    foreignKey: { name: "game_platform" },
});

export default CarritoVideojuegos;
