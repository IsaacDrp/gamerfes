const juegos = [
    { id: 1, nombre: "AMONG US", precio: 100, img: "among.jpeg" },
    { id: 2, nombre: "SUPER MARIO BROS WONDER", precio: 700, img: "mariobrosWonder.webp" },
    { id: 3, nombre: "Mario Kart 8 DELUXE", precio: 800, img: "marioKart.avif" },
    { id: 4, nombre: "Mario vs Donkey Kong", precio: 760, img: "marioVSdonke.jpg" },
    { id: 5, nombre: "SUPER SMASH BROS ULTIMATE", precio: 800, img: "smahsBros.jpg" },
    { id: 6, nombre: "THE LEGEND OF ZELDA", precio: 800, img: "zeldaKingdom.avif" },
    { id: 7, nombre: "THE LEGEND OF ZELDA ECHOES", precio: 900, img: "zeldaEchoes.avif" },
    { id: 8, nombre: "DETECTIVE PIKACHU: EL REGRESO", precio: 850, img: "detectivePikachu.avif" },
    { id: 9, nombre: "SUPER MARIO PARTY JAMBOREE", precio: 900, img: "marioParty.avif" },
];

const paginas = [
    "/productos?page=1",
    "/productos?page=2",
    "/productos?page=3",
];

// Función para renderizar la página principal
export const renderMainPage = (req, res) => {
    res.render("main.pug", { juegos, paginas });
};

// Función para renderizar la página de usuario
export const renderUserPage = (req, res) => {
    res.render("usuario.pug", { juegos, paginas });
};

export const renderForms = (req, res) => {
    const { id } = req.params;
    switch (id) {
      case "colapso1":
        res.render("formularios/usuario.pug");
        break;
      case "colapso2":
        res.render("formularios/domicilio.pug");
        break;
      case "colapso3":
        res.render("formularios/agregarDomicilio.pug");
        break;
      case "colapso4":
        res.render("formularios/verTarjetas.pug");
        break;
      case "colapso5":
        res.render("formularios/agregarTarjeta.pug");
        break;
      default:
        res.status(404).send("Formulario no encontrado");
    }
  }

// Exportación de funciones
export default {
    renderMainPage,
    renderUserPage,
    renderForms,
};
