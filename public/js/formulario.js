document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".btnColapso");

  botones.forEach((boton) => {
    boton.addEventListener("click", async () => {
      const colapsoId = boton.nextElementSibling.id;
      const endpoint = `/usuario/infoUsuario/formularios/${colapsoId}`; // Define el endpoint según el ID
      try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error("Error al cargar el formulario");
        const html = await response.text();
        document.getElementById(colapsoId).innerHTML = html;
      } catch (error) {
        console.error("Error al cargar el contenido:", error);
      }
    });
  });
});
