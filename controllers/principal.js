const principal = (req, res) => {
    const products = [
      { name: "Videojuego 1", description: "Descripción del juego 1", price: "59.99", image_url: "/path/to/image1.jpg" },
      { name: "Videojuego 2", description: "Descripción del juego 2", price: "49.99", image_url: "/path/to/image2.jpg" },
      // Más productos...
    ];
    res.render('principal', { products });
  };
  
  export { principal };
  