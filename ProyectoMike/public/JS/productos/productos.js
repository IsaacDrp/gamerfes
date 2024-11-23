// Capturamos los productos seleccionados por el usuario

let productos = [];
let cliks = 0;

const cerrarCarrito = document.createElement("div")
cerrarCarrito.id = "cerrar"
const tituloCarrito = document.createElement("div");
tituloCarrito.className = "tituloCesto"

// variables generales del DOM
    const Vercarrito = document.querySelector("#carrito");
    const juegoUno = document.querySelector("#juego1");
    const juegoDos = document.querySelector("#juego2");
    const juegoTres = document.querySelector("#juego3");
    const juegoCuatro = document.querySelector("#juego4");
    const juegoCinco = document.querySelector("#juego5");
    const juegoSeis = document.querySelector("#juego6");
    const juegoSiete = document.querySelector("#juego7");
    const juegoOcho = document.querySelector("#juego8");
    const juegoNueve = document.querySelector("#juego9");

if (juegoUno != null && juegoDos != null && juegoTres != null && juegoCuatro != null
    && juegoCinco!=null && juegoSeis!= null && juegoSiete!= null && juegoOcho != null
) {
    juegoUno.addEventListener('click',()=>{
        const propiedades = juegoUno.parentElement.parentElement.parentElement;
        leerCarrito(propiedades);
        alert("Producto agreagado correctamente");
    });
    
    juegoDos.addEventListener('click',()=>{
        const propiedades = juegoDos.parentElement.parentElement.parentElement;
        leerCarrito(propiedades);
        alert("Producto agreagado correctamente");
    });

    juegoTres.addEventListener('click',()=>{
        const propiedades = juegoTres.parentElement.parentElement.parentElement;
        leerCarrito(propiedades);
        alert("Producto agreagado correctamente");
    });

    juegoCuatro.addEventListener('click',()=>{
        const propiedades = juegoCuatro.parentElement.parentElement.parentElement;
        leerCarrito(propiedades);
        alert("Producto agreagado correctamente");
    });

    juegoCinco.addEventListener('click',()=>{
        const propiedades = juegoCinco.parentElement.parentElement.parentElement;
        leerCarrito(propiedades);
        alert("Producto agreagado correctamente");
    });

    juegoSeis.addEventListener('click',()=>{
        const propiedades = juegoSeis.parentElement.parentElement.parentElement;
        leerCarrito(propiedades);
        alert("Producto agreagado correctamente");
    });

    juegoSiete.addEventListener('click',()=>{
        const propiedades = juegoSiete.parentElement.parentElement.parentElement;
        leerCarrito(propiedades);
        alert("Producto agreagado correctamente");
    });

        
    juegoOcho.addEventListener('click',()=>{
        const propiedades = juegoOcho.parentElement.parentElement.parentElement;
        leerCarrito(propiedades);
        alert("Producto agreagado correctamente");
    });

    juegoNueve.addEventListener('click',()=>{
        const propiedades = juegoNueve.parentElement.parentElement.parentElement;
        leerCarrito(propiedades);
        alert("Producto agreagado correctamente");
    });
}
// Recuperamos los datos al recargar la página

window.onload = function () {
    const carritoGuardado = JSON.parse(sessionStorage.getItem("carrito"));
      // Si el carrito ya existe en SessionStorage, lo asignamos a la variable productos
      if (carritoGuardado && carritoGuardado.length > 0) {
        productos = carritoGuardado;
    }
    // Mostrar el carrito con los productos recuperados
    mostrarCarrito();
}

// obtenemos las propiedades del produto
    function leerCarrito(elements) {
        const juegoInfo = {
            imagen: elements.querySelector("img").src,
            titulo: elements.querySelector("h5").textContent,
            precio: elements.querySelector("p").textContent,
            id: elements.querySelector("button").getAttribute("data-id"),
            cantidad: 1
        }
        let existe = productos.some((juego) => juego.id === juegoInfo.id);
        // si tenemos un producto repetido
        if (existe) {
            for(let index = 0;index<productos.length;index++){
                if (productos[index].id === juegoInfo.id) {
                    productos[index].cantidad++;
                    break
                }
            }
        }else{productos.push(juegoInfo)}

          // Guardar el carrito en SessionStorage
        sessionStorage.setItem("carrito", JSON.stringify(productos));
    }
// mostramos el carrito de compras al usuario
    Vercarrito.addEventListener('click',insertarCarrito);
    function insertarCarrito(e) {
        const cesta = document.querySelector("#cesta");
        if (cesta.style.display === 'none') {cesta.style.display = 'flex';}

        if (productos.length == 0) {alert("Su carrito de compras esta vacío")}else{
            if (cliks == 0) {
                const cerrar = document.createElement("div");
                const tituloCesto = document.createElement("div");
                cerrar.id = "cerrar";
                tituloCesto.className = "tituloCesto";
                // creamos la base de la card               
                    const titulo = document.createElement("h5");
                    titulo.textContent = `PRODUCTOS`;
                    const botonCerrar = document.createElement("button");
                    botonCerrar.className = "btn";
                    botonCerrar.innerHTML = `<img src="../../../public/IMG/x.png" width="15px" alt="gamerfes">`;
                   
                    cerrar.appendChild(botonCerrar);
                    tituloCesto.appendChild(titulo);
                    cesta.appendChild(cerrar);
                    cesta.appendChild(tituloCesto)
                    cesta.className = "cesta";

                    const division = document.createElement("hr");
                    cesta.appendChild(division);
                    Vercarrito.removeEventListener("click",insertarCarrito);
                    // Ocultamos la card del usuario cuando es necesario
                    botonCerrar.addEventListener('click',()=>{
                        const producto = document.querySelectorAll(".producto");
                        const comprarCarrito = document.querySelector("#comprarCarrito");
                        cesta.removeChild(comprarCarrito);
                        producto.forEach(elemento =>{elemento.remove();});
                        cesta.style.display = 'none';
                        Vercarrito.addEventListener('click',insertarCarrito);
                    });
                // insertamos en card
                cliks = cliks + 1;
                mostrarCarrito()
            }else{
                Vercarrito.removeEventListener("click",insertarCarrito);
                mostrarCarrito()}
        }
    }

    function mostrarCarrito() {
        const cesta = document.querySelector(".cesta"); 
        productos.forEach((productos)=>{
            
            const boton = document.querySelector("#comprarCarrito");
            if (boton != null) {cesta.removeChild(boton);}
            
            // insertamos los elementos en el carritoCard
            const {imagen,titulo,precio,cantidad} = productos;
            const producto = document.createElement("div");
            producto.className = "producto";

            const imgProducto = document.createElement("div");
            imgProducto.className = "imgProducto";
            const contenidoProducto = document.createElement("div");
            contenidoProducto.className = "contenidoProducto";
            const eliminarProducto = document.createElement("div");
            eliminarProducto.className = "eliminarProducto";
            
            // capturamos el producto

            imgProducto.innerHTML = `<img src="${imagen}" width="150px" alt="shopGame" class="cardIMG">`;
            contenidoProducto.innerHTML = `
                <p class="textoCarrito">${titulo} (${cantidad})</p>
                <h6 class="textoCarrito">MXN ${precio}</h6>
            `;
            eliminarProducto.innerHTML = `
              <button class="btn">
                    <img src="../../../public/IMG/basura.png" width="25px" alt="gamerfes">
                </button>
            `
            producto.appendChild(imgProducto);
            producto.appendChild(contenidoProducto);
            producto.appendChild(eliminarProducto);
            cesta.appendChild(producto);

            const comprarCarrito = document.createElement("div");
            comprarCarrito.id = "comprarCarrito";
            comprarCarrito.innerHTML = `<a href="../../../views/formularios/comprar/compras.html" class="compraCarrito">Comprar</a>`;
                    
            cesta.appendChild(comprarCarrito);
        });
    }