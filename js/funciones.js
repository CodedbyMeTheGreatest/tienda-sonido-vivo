const formularioC = document.querySelector("#form-contacto");
const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const patronTelefono = /^\+?[0-9]{8,15}$/;

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