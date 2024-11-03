document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todas las opciones de filtro
    const filterOptions = document.querySelectorAll('.filter-option');
  
    filterOptions.forEach(option => {
      option.addEventListener('click', () => {
        // Cierra cualquier opción abierta
        filterOptions.forEach(otherOption => {
          if (otherOption !== option && otherOption.classList.contains('open')) {
            otherOption.classList.remove('open');
          }
        });
  
        // Alterna la clase 'open' en la opción seleccionada
        option.classList.toggle('open');
      });
    });
  });
  