const DOMINIOS_PERMITIDOS = ['duocuc.cl', 'profesor.duoc.cl', 'gmail.com', 'example.com'];

const PATRONES = {
    correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    telefono: /^\+?[0-9]{8,15}$/,
    run: /^\d{6,8}[0-9K]$/i
}

const DATOS_REGIONES = [
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
    { nombre: "Biobío", comunas: ["Concepción", "Talcahuano", "Los Ángeles", "San Pedro de La Paz", "Coronel", "Lota"] },
    { nombre: "La Araucanía", comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol"] },
    { nombre: "Los Ríos", comunas: ["Valdivia", "La Unión", "Río Bueno", "Panguipulli", "Futrono"] },
    { nombre: "Los Lagos", comunas: ["Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas"] },
    { nombre: "Aysén", comunas: ["Coyhaique", "Puerto Aysén", "Cochrane", "Chile Chico"] },
    { nombre: "Magallanes", comunas: ["Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos"] }
];

const CATEGORIAS_PRODUCTO = [
    { id: "GT-ACU", nombre: "Guitarras Acústicas" },
    { id: "GT-ELE", nombre: "Guitarras Eléctricas" },
    { id: "BJ-ELE", nombre: "Bajos Eléctricos" },
    { id: "BAT-PERC", nombre: "Baterias" },
    { id: "TC-PIA", nombre: "Teclados y Pianos" },
    { id: "AMP", nombre: "Amplificadores" },
    { id: "MIC", nombre: "Micrófonos" },
    { id: "PD-FX", nombre: "Pedales de Efectos" },
    { id: "ACC-MUS", nombre: "Accesorios" },
    { id: "EST-GRAB", nombre: "Estudio y Grabación" }
]


const validador = {
    esTextoValido: (val, min = 1, max = Infinity) => {
        const texto = val.trim();
        return texto.length >= min && texto.length <= max;
    },
    esCorreoValido: (correo) => {
        const valor = correo.trim();
        if (!PATRONES.correo.test(valor)) return false;
        const dominio = valor.split('@')[1]?.toLowerCase()
        return DOMINIOS_PERMITIDOS.includes(dominio);
    },
    esRunValido: (run) => PATRONES.run.test(run.trim()),
    esTelefonoValido: (tel) => tel.trim() === '' || PATRONES.telefono.test(tel.trim()),
    coinciden: (val1, val2) => val1.trim() === val2.trim(),
    esNumeroValido: (val, min = 0, max = Infinity) => {
        if (val === '' || val === null) return false;
        const num = Number(val);
        return !Number.isNaN(num) && num >= min && num <= max;
    },
    esImagenValida: (archivoInput, maxMB = 2, esRequerido = false) => {
        const archivo = archivoInput?.files[0];

        if (!archivo) {
            return !esRequerido;
        }

        const esTipoImagen = archivo.type.startsWith('image/');
        const tamanoEnBytes = maxMB * 1024 * 1024;
        const tamanoValido = archivo.size <= tamanoEnBytes;

        return esTipoImagen && tamanoValido;
    }
};

const UI = {
marcarCampo: (elemento, esValido, idError = null, mensaje = '') => {
        if (!elemento) return;
        elemento.classList.toggle('campo-error', !esValido);

        if (idError) {
            const spanError = document.getElementById(idError);
            if (spanError) {
                spanError.textContent = esValido ? '' : mensaje;
                spanError.classList.toggle('texto-error', !esValido);
            }
        }
    },
    mostrarMensaje: (elemento, mensaje, esExito) => {
        if (!elemento) return;
        elemento.textContent = mensaje;
        elemento.classList.toggle('texto-exito', esExito);
        elemento.classList.toggle('texto-error', !esExito);
    },
    poblarSelect: (select, opciones, textoDefault) => {
        if (!select) return;
        select.textContent = '';
        if (textoDefault) {
            select.appendChild(new Option(textoDefault, ""));
        }
        opciones.forEach(opt => {
            const valor = typeof opt === 'string' ? opt : opt.nombre;
            select.appendChild(new Option(valor, valor));
        })
    }
}

const formContacto = document.querySelector("#form-contacto");
if (formContacto) {
    formContacto.addEventListener("submit", function (e) {
        e.preventDefault();
        const { elementos } = formContacto;
        const confirmacion = document.querySelector("#mensaje-confirmacion");

        const validaciones = [
            {
                elemento: elementos["nombre-contacto"],
                estado: validador.esTextoValido(elementos["nombre-contacto"]?.value, 3),
                idError: "error-nombre",
                mensaje: "El nombre debe tener al menos 3 caracteres."
            },
            {
                elemento: elementos["correo-contacto"],
                estado: validador.esCorreoValido(elementos["correo-contacto"]?.value),
                idError: "error-correo",
                mensaje: "Correo inválido. Solo dominios @duoc.cl, @profesor.duoc.cl o @gmail.com."
            },
            {
                elemento: elementos["telefono-contacto"],
                estado: validador.esTelefonoValido(elementos["telefono-contacto"]?.value),
                idError: "error-telefono",
                mensaje: "Número de teléfono no válido."
            },
            {
                elemento: elementos["mensaje-contacto"],
                estado: validador.esTextoValido(elementos["mensaje-contacto"]?.value, 10),
                idError: "error-mensaje",
                mensaje: "El mensaje debe tener al menos 10 caracteres."
            }
        ];

        let esFormularioValido = true;
        validaciones.forEach(({ elemento, estado, idError, mensaje }) => {
            UI.marcarCampo(elemento, estado, idError, mensaje);
            if (!estado) esFormularioValido = false;
        });

        if (esFormularioValido) {
            UI.mostrarMensaje(confirmacion, 'Muchas gracias por contactarse con nosotros, su mensaje fue enviado con éxito.', true);
            formContacto.reset();
        } else {
            UI.mostrarMensaje(confirmacion, 'Por favor, revise los campos marcados.', false);
        }
    });
}

/* INICIO SESION Y REGISTRO VISTA TIENDA*/
const formLogin = document.querySelector("#inicio-sesion");
if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const { correo, contraseña } = formLogin.elements;
        const mensaje = document.querySelector("#mensaje-confirmacion-login");

        const validaciones = [
            {
                elemento: correo,
                estado: validador.esCorreoValido(correo.value),
                idError: "error-correo",
                mensaje: "Correo inválido. Solo se aceptan los dominios de @duoc.cl, @profesor.duoc.cl o @gmail.com."
            },
            {
                elemento: contraseña,
                estado: validador.esTextoValido(contraseña.value, 4, 10),
                idError: "error-contraseña",
                mensaje: "Contraseña incorrecta. Asegúrese de que tenga entre 4 y 10 caracteres."
            }
        ];

        let esFormularioValido = true;
        validaciones.forEach(({ elemento, estado, idError, mensaje }) => {
            UI.marcarCampo(elemento, estado, idError, mensaje);
            if (!estado) esFormularioValido = false;
        });

        if (esFormularioValido) {
            UI.mostrarMensaje(mensaje, "Validación exitosa. Iniciando sesión...", true);
        } else {
            UI.mostrarMensaje(mensaje, "Por favor, revise los campos marcados.", false);
        }
    });
}

const formRegistro = document.querySelector("#form-registro");
if (formRegistro) {
    const selectRegion = formRegistro.querySelector("#region-registro");
    const selectComuna = formRegistro.querySelector("#comuna-registro");

    if (selectRegion && selectComuna) {
        UI.poblarSelect(selectRegion, DATOS_REGIONES, "Seleccione su región");

        selectRegion.addEventListener("change", (e) => {
            const regionEncontrada = DATOS_REGIONES.find(r => r.nombre === e.target.value);
            const comunas = regionEncontrada ? regionEncontrada.comunas : [];
            UI.poblarSelect(selectComuna, comunas, "Seleccione su comuna");
        });
    }

    formRegistro.addEventListener("submit", (e) => {
        e.preventDefault();
        const el = formRegistro.elements;
        const mensajeReg = document.querySelector("#mensaje-confirmacion-registro");

        const passCoincide = validador.coinciden(el["contraseña"]?.value, el["confirmar-contraseña"]?.value);
        const passLongitud = validador.esTextoValido(el["contraseña"]?.value, 4, 10);

        const validaciones = [
            {
                elemento: el["run-completo"] || el["run"],
                estado: validador.esRunValido((el["run-completo"] || el["run"])?.value),
                idError: "error-run",
                mensaje: "RUN inválido. Ingrese su RUN sin puntos ni guion (7 a 9 caracteres)."
            },
            {
                elemento: el["nombres"],
                estado: validador.esTextoValido(el["nombres"]?.value, 1, 50),
                idError: "error-nombres",
                mensaje: "Los nombres tienen un máximo de 50 caracteres."
            },
            {
                elemento: el["apellidos"],
                estado: validador.esTextoValido(el["apellidos"]?.value, 1, 100),
                idError: "error-apellidos",
                mensaje: "Los apellidos tienen un máximo de 100 caracteres."
            },
            {
                elemento: el["correo"],
                estado: validador.esCorreoValido(el["correo"]?.value) && (el["correo"]?.value.length <= 100),
                idError: "error-correo",
                mensaje: "Correo inválido. Solo dominios @duocuc.cl, @profesor.duoc.cl, @gmail.com, @example.com."
            },
            {
                elemento: el["direccion-registro"] || el["direccion"],
                estado: validador.esTextoValido((el["direccion-registro"] || el["direccion"])?.value, 1, 300),
                idError: "error-direccion",
                mensaje: "La dirección tiene un máximo de 300 caracteres."
            },
            {
                elemento: el["region-registro"],
                estado: validador.esTextoValido(el["region-registro"]?.value),
                idError: "error-region",
                mensaje: "Por favor seleccione una región."
            },
            {
                elemento: el["comuna-registro"],
                estado: validador.esTextoValido(el["comuna-registro"]?.value),
                idError: "error-comuna",
                mensaje: "Por favor seleccione una comuna."
            },
            {
                elemento: el["contraseña"],
                estado: passLongitud,
                idError: "error-contraseña",
                mensaje: "La contraseña debe tener entre 4 y 10 caracteres."
            },
            {
                elemento: el["confirmar-contraseña"] || el["confirmarContra"],
                estado: passCoincide && validador.esTextoValido((el["confirmar-contraseña"] || el["confirmarContra"])?.value),
                idError: "error-confirmar-con",
                mensaje: "Las contraseñas no coinciden."
            }
        ];

        let esFormularioValido = true;
        validaciones.forEach(({ elemento, estado, idError, mensaje }) => {
            UI.marcarCampo(elemento, estado, idError, mensaje);
            if (!estado) esFormularioValido = false;
        });

        if (esFormularioValido) {
            UI.mostrarMensaje(mensajeReg, "Registro validado exitosamente.", true);
            formRegistro.reset();
        } else {
            UI.mostrarMensaje(mensajeReg, "Hay errores en el formulario. Por favor verifique los campos marcados.", false);
        }
    });
}

/*Registro y Edicion de Producto*/
function validadorFormularioProducto(idForm, idMensaje, mensajeExito, limpiarAlExito = true) {
    const form = document.querySelector(idForm);
    if (!form) return;

    const selectCategoria = form.querySelector("[name='categoria-producto']");
    if (selectCategoria) {
        UI.poblarSelect(selectCategoria, CATEGORIAS_PRODUCTO, "Seleccione la categoría");
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const elementos = form.elements;
        const contenedorMensaje = document.querySelector(idMensaje);

        const validaciones = [
            {
                elemento: elementos["codigo-producto"],
                estado: validador.esTextoValido(elementos["codigo-producto"]?.value, 3),
                idError: "error-codigo-producto",
                mensaje: "El código debe tener al menos 3 caracteres."
            },
            {
                elemento: elementos["nombre-producto"],
                estado: validador.esTextoValido(elementos["nombre-producto"]?.value, 1, 100),
                idError: "error-nombre-producto",
                mensaje: "El nombre es obligatorio y debe tener máximo 100 caracteres."
            },
            {
                elemento: elementos["descripcion-producto"],
                estado: validador.esTextoValido(elementos["descripcion-producto"]?.value, 1, 500),
                idError: "error-descripcion-producto",
                mensaje: "La descripción es obligatoria y debe tener máximo 500 caracteres."
            },
            {
                elemento: elementos["precio-producto"],
                estado: validador.esNumeroValido(elementos["precio-producto"]?.value, 0, 10000000),
                idError: "error-precio-producto",
                mensaje: "El precio debe ser un número entre 0 y $10.000.000."
            },
            {
                elemento: elementos["stock-producto"],
                estado: validador.esNumeroValido(elementos["stock-producto"]?.value, 0),
                idError: "error-stock-producto",
                mensaje: "El stock debe ser un número igual o mayor a 0."
            },
            {
                elemento: elementos["stock-critico-producto"],
                estado: elementos["stock-critico-producto"]?.value === '' || validador.esNumeroValido(elementos["stock-critico-producto"]?.value, 0),
                idError: "error-stock-critico-producto",
                mensaje: "El stock crítico debe ser un número positivo."
            },
            {
                elemento: elementos["categoria-producto"],
                estado: validador.esTextoValido(elementos["categoria-producto"]?.value),
                idError: "error-categoria-producto",
                mensaje: "Debe seleccionar una categoría."
            },
            {
                elemento: elementos["imagen-producto"],
                estado: validador.esImagenValida(elementos["imagen-producto"], 2, false),
                idError: "error-imagen-producto",
                mensaje: "El archivo debe ser una imagen válida y pesar menos de 2MB."
            }
        ];

        let esFormularioValido = true;
        validaciones.forEach(({ elemento, estado, idError, mensaje }) => {
            UI.marcarCampo(elemento, estado, idError, mensaje);
            if (!estado) esFormularioValido = false;
        });

        if (esFormularioValido) {
            UI.mostrarMensaje(contenedorMensaje, mensajeExito, true);
            if (limpiarAlExito) {
                form.reset();
            }
        } else {
            UI.mostrarMensaje(contenedorMensaje, "Por favor revise los datos del producto.", false);
        }
    });
}

validadorFormularioProducto(
    "#form-registro-producto-admin",
    "#mensaje-confirmacion-registro-producto-admin",
    "Producto registrado correctamente",
    true
);

validadorFormularioProducto(
    "#form-editar-producto-admin",
    "#mensaje-confirmacion-editar-producto-admin",
    "Producto actualizado correctamente.",
    false
);