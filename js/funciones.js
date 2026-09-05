const formularioC = document.querySelector("#form-contacto");
const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const patronTelefono = /^\+?[0-9]{8,15}$/;
if(formularioC) {
formularioC.addEventListener("submit", function (e) {
    e.preventDefault();

  
    const camposRequeridos = document.querySelectorAll("#form-contacto [required]");
    Array.from(camposRequeridos).forEach(function (campo) {
        if (campo.value.trim() === "") {
            campo.classList.add('campo-error');
        } else {
            campo.classList.remove('campo-error');
        }
    });

    const correo = document.querySelector("#correo-contacto");
    if (correo.value.trim() !== '') {
        if (!patronCorreo.test(correo.value.trim())) {
            correo.classList.add('campo-error');
        } else {
            correo.classList.remove('campo-error');
        }
    }

  
    const nombre = document.querySelector("#nombre-contacto");
    if (nombre.value.trim() !== '') {
        if (nombre.value.trim().length < 3) {
            nombre.classList.add('campo-error');
        } else {
            nombre.classList.remove('campo-error');
        }
    }

   
    const telefono = document.querySelector("#telefono-contacto");
    if (telefono.value.trim() !== '') {
        if (!patronTelefono.test(telefono.value.trim())) {
            telefono.classList.add('campo-error');
        } else {
            telefono.classList.remove('campo-error');
        }
    }

   
    const mensaje = document.querySelector("#mensaje-contacto");
    if (mensaje.value.trim() !== '') {
        if (mensaje.value.trim().length < 10) {
            mensaje.classList.add('campo-error');
        } else {
            mensaje.classList.remove('campo-error');
        }
    }

   
    const errores = document.querySelectorAll("#form-contacto .campo-error");
    const confirmacion = document.querySelector("#mensaje-confirmacion");

 
    if (errores.length === 0) {
        confirmacion.textContent = 'Muchas gracias por contactarse con nosotros, su mensaje fue enviado con éxito.';
        confirmacion.classList.remove('texto-error');
        confirmacion.classList.add('texto-exito');
        formularioC.reset(); 
    } else {
        confirmacion.textContent = 'Por favor, revise los campos marcados.';
        confirmacion.classList.remove('texto-exito');
        confirmacion.classList.add('texto-error');
    }
});
}

/* INICIO SESION Y REGISTRO VISTA TIENDA*/

const dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com']
const datosRegiones = [
    { nombre: "Arica y Parinacota", comunas: ["Arica", "Camarones", "Putre", "General Lagos"] },
    { nombre: "Tarapacá", comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica", "Huara"] },
    { nombre: "Antofagasta", comunas: ["Antofagasta", "Calama", "Tocopilla", "Mejillones", "San Pedro de Atacama"] },
    { nombre: "Atacama", comunas: ["Copiapó", "Vallenar", "Caldera", "Huasco", "Chañaral"] },
    { nombre: "Coquimbo", comunas: ["La Serena", "Coquimbo", "Ovalle", "Illapel", "Vicuña"] },
    { nombre: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio", "Los Andes"] },
    { nombre: "Región Metropolitana", comunas: ["Santiago", "La Pintana", "El Bosque", "San Bernardo", "Maipú", "Providencia", "Las Condes", "Florida"] },
    { nombre: "O'Higgins", comunas: ["Rancagua", "Machalí", "San Fernando", "Rengo", "Pichilemu"] },
    { nombre: "Maule", comunas: ["Talca", "Curicó", "Linares", "Constitución", "Cauquenes"] },
    { nombre: "Ñuble", comunas: ["Chillán", "San Carlos", "Bulnes", "Quillón", "Coihueco"] },
    { nombre: "Biobío", comunas: ["Concepción", "Talcahuano", "Los Ángeles", "San Pedro de la Paz", "Coronel", "Lota"] },
    { nombre: "La Araucanía", comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol"] },
    { nombre: "Los Ríos", comunas: ["Valdivia", "La Unión", "Río Bueno", "Panguipulli", "Futrono"] },
    { nombre: "Los Lagos", comunas: ["Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas"] },
    { nombre: "Aysén", comunas: ["Coyhaique", "Puerto Aysén", "Cochrane", "Chile Chico"] },
    { nombre: "Magallanes", comunas: ["Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos"] }];

const patronRun = /^\d{6,8}[0-9K]$/

function validar(variable, esValido,idError, mensaje) {
    const spanError = document.getElementById(idError)
    if (esValido) {
        variable.classList.remove('campo-error');
        if(spanError)spanError.textContent = ''
        return true;
    } else {
        variable.classList.add('campo-error');
        if(spanError)spanError.textContent = mensaje
        return false;
    }
}

function validarCorreo(correo) {
    
    if(!patronCorreo.test(correo)) return false
    const dominio = correo.split('@')[1]?.toLowerCase()
    return dominiosPermitidos.includes(dominio)
}

function validarRun(run){
    const runLimpio = run.trim().toUpperCase()
    if(!patronRun.test(runLimpio)) return false
    return true

}

function cargarRegiones() {
    const region = document.querySelector("#region-registro");
    if (!region) return;

    datosRegiones.forEach(reg => {
        const opcion = document.createElement("option");
        opcion.value = reg.nombre;
        opcion.textContent = reg.nombre;
        region.appendChild(opcion);
    });
}

function cargarComunas(regionSeleccionada) {
    const comuna = document.querySelector("#comuna-registro");
    comuna.innerHTML = '<option value="">Seleccione su comuna</option>';

    const regionEncontrada = datosRegiones.find(r => r.nombre === regionSeleccionada);
    
    if (regionEncontrada) {
        regionEncontrada.comunas.forEach(com => {
            const opcion = document.createElement("option");
            opcion.value = com;
            opcion.textContent = com;
            comuna.appendChild(opcion);
        });
    }
}


if(document.querySelector("#inicio-sesion")) {

    const formularioIS = document.querySelector("#inicio-sesion")

    formularioIS.addEventListener("submit", function(e) {
        e.preventDefault()

        const correo = document.querySelector("#correo")
        const contraseña = document.querySelector("#contraseña")
        const mensaje = document.querySelector("#mensaje-confirmacion-login")

        let formularioValido = true

        if(!validar(correo,validarCorreo(correo.value), 'error-correo', 'Correo invalido. Solo se aceptan los dominios de @duoc.cl, @profesor.duoc.cl o @gmail.com')){
            formularioValido = false
        }


        const contraseñaLimpia = contraseña.value.trim()
        if (!validar(contraseña, contraseñaLimpia.length >= 4 && contraseñaLimpia.length <= 10,'error-contraseña','Contraseña incorrecta. Asegurese de que la contraseña tenga entre 4 y 10 caracteres')){
            formularioValido = false
        }

        if (formularioValido){
            mensaje.textContent = "Validacion exitosa. Iniciando sesion..."
            mensaje.classList.remove('texto-error')
            mensaje.classList.add('texto-exito')
        } else{
            mensaje.textContent = "Por favor, revise los campos marcados."
            mensaje.classList.remove('texto-exito')
            mensaje.classList.add('texto-error')
            
        }
    }
)}


if(document.querySelector("#form-registro")){

    const formularioReg = document.querySelector("#form-registro")
    cargarRegiones();

    const selectRegion = document.querySelector("#region-registro")
    selectRegion.addEventListener("change", function(e) {
        cargarComunas(e.target.value);
    });


    formularioReg.addEventListener("submit", function (e) {
        e.preventDefault()

        let formularioValido = true

        const run = document.querySelector("#run-completo")
        const nombres = document.querySelector("#nombres")
        const apellidos = document.querySelector("#apellidos")
        const correo = document.querySelector("#correo")
        const fechaNac = document.querySelector("#fecha-nacimiento")
        const region = document.querySelector("#region-registro")
        const comuna = document.querySelector("#comuna-registro")        
        const direccion = document.querySelector("#direccion-registro")
        const contraseña = document.querySelector("#contraseña")
        const confirmarContra = document.querySelector("#confirmar-contraseña")


        const mensajeReg = document.querySelector("#mensaje-confirmacion-registro")
        
        if(!validar(run,validarRun(run.value),'error-run','RUN invalido. Por favor ingrese su RUN sin puntos ni guion y que tenga entre 7 y 9 caracteres.')){
            formularioValido = false
        }

        const nombresLimpios = nombres.value.trim()
        if(!validar(nombres, nombresLimpios.length >0 && nombresLimpios.length<=50,'error-nombres','Los nombres tienen un maximo de 50 caracteres. Por favor intentelo de nuevo')){
            formularioValido=false
        }

        if(!validar(correo,validarCorreo(correo.value) && correo.value.length > 0 && correo.value.length <=100,'error-correo', 'Correo invalido. Solo se aceptan los dominios de @duoc.cl, @profesor.duoc.cl o @gmail.com')){
            formularioValido=false
        }

        const apellidosLimpios = apellidos.value.trim()
        if(!validar(apellidos,apellidosLimpios.length>0 && apellidosLimpios.length<=100,'error-apellidos','Los apellidos tienen un maximo de 100 caracteres. Por favor intentelo de nuevo.')){
            formularioValido=false
        }

        if(fechaNac.value !== ""){
            validar(fechaNac, true)
        }

        const direccionLimpia = direccion.value.trim()
        if(!validar(direccion,direccionLimpia.length > 0 && direccionLimpia.length <= 300,'error-direccion','La direccion tiene un maximo de 300 caracteres. Por favor intentelo de nuevo.')){
            formularioValido=false
        }

        const contraseñaLimpia=contraseña.value.trim()
        const confirmarContraLimpia = confirmarContra.value.trim()
        const contraseñaValida = contraseñaLimpia.length >= 4 && contraseñaLimpia.length <= 10;
        const confirmacionValida = contraseñaLimpia === confirmarContraLimpia && confirmarContraLimpia.length > 0;

        if(!validar(contraseña, contraseñaValida, 'error-contraseña','La contraseña debe tener entre 4 y 10 caracteres.')){
            formularioValido = false
        }
        if(!validar(confirmarContra, confirmacionValida, 'error-confirmar-con','Las contraseñas no coinciden.')){
            formularioValido = false
        }

        if(!validar(region,region.value !=="")){
            formularioValido=false
        }

        if(!validar(comuna,comuna.value !=="")){
            formularioValido=false
        }

        if(formularioValido){
            mensajeReg.textContent="Registro validado exitosamente."
            mensajeReg.classList.remove('texto-error')
            mensajeReg.classList.add('texto-exito')
        } else {
            mensajeReg.textContent="Hay errores en el formulario. Por favor verifique los campos marcados."
            mensajeReg.classList.remove('texto-exito')
            mensajeReg.classList.add('texto-error')
        }     
    })

    }


