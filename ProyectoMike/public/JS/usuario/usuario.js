let cliks = 0;
// variables generales
    const infoPersonal = document.querySelector("#infoPersonal");
    const verDomicilio = document.querySelector("#verDomicilio");
    const agregarDomicilio = document.querySelector("#agregarDomicilio");
    const verTarjeta = document.querySelector("#verTarjeta");
    const agregarTarjeta = document.querySelector("#agregarTarjeta");

// agregamos un domicilio
    agregarDomicilio.addEventListener('click',()=>{
        const contenidoColapso = document.querySelector("#colapso3");
        if (contenidoColapso.innerHTML.trim()==='') {
            const form = document.createElement("form");
            form.classList.add("row");
            form.classList.add("g-3");
            // Generamos el formulario
                const divUno = document.createElement("div");
                divUno.classList.add("col-md-6");
                divUno.innerHTML = `
                    <div class="col-sm-10">
                        <input type="estado" class="form-control" id="colFormLabel" placeholder="Estado">
                    </div>
                `;
                const divDos = document.createElement("div");
                divDos.classList.add("col-md-6");
                divDos.innerHTML = `
                    <div class="col-sm-10">
                        <input type="estado" class="form-control" id="colFormLabel" placeholder="Ciudad">
                    </div>
                `;
                const divTres = document.createElement("div");
                divTres.classList.add("col-md-6");
                divTres.innerHTML = `
                    <div class="col-sm-10">
                        <input type="estado" class="form-control" id="colFormLabel" placeholder="Código postal">
                    </div>
                `;
                const divCuatro = document.createElement("div");
                divCuatro.classList.add("col-md-6");
                divCuatro.innerHTML = `
                    <div class="col-sm-10">
                        <input type="estado" class="form-control" id="colFormLabel" placeholder="Colonia">
                    </div>
                `;
                const divCinco = document.createElement("div");
                divCinco.classList.add("col-md-6");
                divCinco.innerHTML = `
                    <div class="col-sm-10">
                        <input type="estado" class="form-control" id="colFormLabel" placeholder="Calle">
                    </div>
                `;
                const divSeis = document.createElement("div");
                divSeis.classList.add("col-md-6");
                divSeis.innerHTML = `
                    <div class="col-sm-10">
                        <input type="estado" class="form-control" id="colFormLabel" placeholder="Número de casa">
                    </div>
                `;
                const divSiete = document.createElement("div");
                divSiete.classList.add("btnFormulario");
                divSiete.innerHTML=`<button type="submit" class="btn btn-dark btnFormu">Enviar</button>`;
                
                form.append(divUno,divDos,divTres,divCuatro,divCinco,divSeis,divSiete);
            contenidoColapso.appendChild(form);
        }else {contenidoColapso.innerHTML = "";}
    });

    function enviarDomicilio(params) {}

// agregamos una tarjeta de pago
    agregarTarjeta.addEventListener('click',()=>{
        const contenidoColapso = document.querySelector("#colapso5");
        if (contenidoColapso.innerHTML.trim()==='') {
            const form = document.createElement("form");
            form.classList.add("row");
            form.classList.add("g-3");
             // Generamos el formulario
                const divUno = document.createElement("div");
                divUno.classList.add("col-md-6");
                divUno.innerHTML = `
                    <div class="col-sm-10">
                        <select class="form-select" id="validationCustom04" required>
                            <option>Debito</option>
                            <option>Crédito</option>
                        </select>
                    </div>
                `;
                const divDos = document.createElement("div");
                divDos.classList.add("col-md-6");
                divDos.innerHTML = `
                    <div class="col-sm-10">
                        <input type="estado" class="form-control" id="colFormLabel" placeholder="Número de tarjeta">
                    </div>
                `;
                const divTres = document.createElement("div");
                divTres.classList.add("col-md-6");
                divTres.innerHTML = `
                    <div class="col-sm-10">
                        <input type="estado" class="form-control" id="colFormLabel" placeholder="Fecha de Vencimiento">
                    </div>
                `;
                const divCuatro = document.createElement("div");
                divCuatro.classList.add("col-md-6");
                divCuatro.innerHTML = `
                    <div class="col-sm-10">
                        <input type="estado" class="form-control" id="colFormLabel" placeholder="CVV">
                    </div>
                `;
                const divCinco = document.createElement("div");
                divCinco.classList.add("btnFormulario");
                divCinco.innerHTML = `<button type="submit" class="btn btn-dark btnFormu">Enviar</button>`;
                form.append(divUno,divDos,divTres,divCuatro,divCinco);
            contenidoColapso.appendChild(form);
        } else {contenidoColapso.innerHTML=""}
    });
    function enviarTarjeta(params) {}