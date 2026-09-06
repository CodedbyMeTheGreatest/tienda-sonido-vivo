const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

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

const catalogoProductos = [
    { codigo: "GA001", categoria: "Guitarras Acústicas", nombre: "Guitarra Acústica Folk", marca: "Yamaha", modelo: "F310", stock: 8, precio: 129990, descripcion: "Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes." },
    { codigo: "GA002", categoria: "Guitarras Acústicas", nombre: "Guitarra Acústica Dreadnought", marca: "Fender", modelo: "CD-60S", stock: 5, precio: 189990, descripcion: "Tapa de abeto macizo, brazo de caoba. Sonido cálido y proyectado." },
    { codigo: "GA003", categoria: "Guitarras Acústicas", nombre: "Guitarra Acústica Clásica 4/4", marca: "Yamaha", modelo: "C40", stock: 10, precio: 89990, descripcion: "Nailon, tapa de abeto. Ideal para estudio y flamenco." },
    { codigo: "GA004", categoria: "Guitarras Acústicas", nombre: "Guitarra Electroacústica", marca: "Takamine", modelo: "GN20CE", stock: 3, precio: 349990, descripcion: "Pickup integrado, afinador incorporado." },
    { codigo: "GA005", categoria: "Guitarras Acústicas", nombre: "Guitarra 3/4 Niños", marca: "Yamaha", modelo: "JR1", stock: 6, precio: 79990, descripcion: "Tamaño reducido para niños de 6 a 10 años." },
    { codigo: "GE001", categoria: "Guitarras Eléctricas", nombre: "Guitarra Eléctrica Stratocaster", marca: "Squier", modelo: "Affinity Strat", stock: 5, precio: 249990, descripcion: "Cuerpo de álamo, mástil de arce, pastillas SSS." },
    { codigo: "GE002", categoria: "Guitarras Eléctricas", nombre: "Guitarra Eléctrica Les Paul", marca: "Epiphone", modelo: "Les Paul Std", stock: 4, precio: 329990, descripcion: "Cuerpo caoba, tapa arce, pastillas humbucker." },
    { codigo: "GE003", categoria: "Guitarras Eléctricas", nombre: "Guitarra Eléctrica SG", marca: "Epiphone", modelo: "SG Standard", stock: 3, precio: 319990, descripcion: "Cuerpo caoba, mástil caoba, 2 humbuckers." },
    { codigo: "GE004", categoria: "Guitarras Eléctricas", nombre: "Guitarra Eléctrica Telecaster", marca: "Squier", modelo: "Affinity Tele", stock: 4, precio: 239990, descripcion: "Cuerpo álamo, clavijero vintage, 2 pastillas single." },
    { codigo: "GE005", categoria: "Guitarras Eléctricas", nombre: "Guitarra Eléctrica Semi-hollow", marca: "Epiphone", modelo: "ES-335", stock: 2, precio: 549990, descripcion: "Semi-hueca, 2 humbuckers, ideal para jazz y blues." },
    { codigo: "BA001", categoria: "Bajos Eléctricos", nombre: "Bajo Eléctrico 4 Cuerdas", marca: "Squier", modelo: "Affinity PJ", stock: 5, precio: 299990, descripcion: "Pickup PJ, cuerpo álamo, mástil arce." },
    { codigo: "BA002", categoria: "Bajos Eléctricos", nombre: "Bajo Eléctrico Jazz Bass", marca: "Fender", modelo: "Player Jazz", stock: 2, precio: 699990, descripcion: "Alder body, 2 Alnico V Jazz single-coil." },
    { codigo: "BA003", categoria: "Bajos Eléctricos", nombre: "Bajo Acústico 4 Cuerdas", marca: "Yamaha", modelo: "APX700II", stock: 2, precio: 429990, descripcion: "Electroacústico, afinador incorporado." },
    { codigo: "BT001", categoria: "Baterías", nombre: "Batería Acústica 5 piezas", marca: "Pearl", modelo: "Roadshow", stock: 2, precio: 599990, descripcion: "Incluye stands, platillos y pedal de bombo." },
    { codigo: "BT002", categoria: "Baterías", nombre: "Batería Electrónica 8 pads", marca: "Roland", modelo: "TD-02KV", stock: 2, precio: 799990, descripcion: "Módulo TD-02, 8 pads de goma, pedal hi-hat." },
    { codigo: "BT003", categoria: "Baterías", nombre: "Caja Snare 14\"", marca: "Pearl", modelo: "STE1450", stock: 4, precio: 89990, descripcion: "Acero, 14x5\", 10 tensores." },
    { codigo: "BT004", categoria: "Baterías", nombre: "Platillo Hi-Hat 14\"", marca: "Zildjian", modelo: "A Series", stock: 3, precio: 149990, descripcion: "Latón B20, sonido brillante y claro." },
    { codigo: "BT005", categoria: "Baterías", nombre: "Platillo Crash 16\"", marca: "Zildjian", modelo: "A Series", stock: 3, precio: 129990, descripcion: "Latón B20, ataque rápido." },
    { codigo: "TC001", categoria: "Teclados y Pianos", nombre: "Teclado Digital 61 teclas", marca: "Yamaha", modelo: "PSR-E373", stock: 4, precio: 249990, descripcion: "61 teclas sensibles al tacto, 622 voces." },
    { codigo: "TC002", categoria: "Teclados y Pianos", nombre: "Piano Digital 88 teclas", marca: "Yamaha", modelo: "P-45", stock: 2, precio: 499990, descripcion: "88 teclas pesadas, 10 voces, pedal sustain incluido." },
    { codigo: "TC003", categoria: "Teclados y Pianos", nombre: "Sintetizador 49 teclas", marca: "Arturia", modelo: "MiniLab MKII", stock: 5, precio: 129990, descripcion: "MIDI controller, 49 mini teclas." },
    { codigo: "TC004", categoria: "Teclados y Pianos", nombre: "Teclado MIDI 88 teclas", marca: "M-Audio", modelo: "Hammer 88", stock: 2, precio: 399990, descripcion: "88 teclas martillo, sin sonidos propios." },
    { codigo: "AM001", categoria: "Amplificadores", nombre: "Amplificador Guitarra 15W", marca: "Fender", modelo: "Frontman 15G", stock: 5, precio: 99990, descripcion: "15W, distorsión incorporada, entrada auxiliar." },
    { codigo: "AM002", categoria: "Amplificadores", nombre: "Amplificador Guitarra 40W", marca: "Marshall", modelo: "MG40GFX", stock: 3, precio: 299990, descripcion: "40W, 4 canales, efectos digitales integrados." },
    { codigo: "AM003", categoria: "Amplificadores", nombre: "Amplificador Bajo 100W", marca: "Hartke", modelo: "HD100", stock: 2, precio: 449990, descripcion: "100W, tweeter integrado, ecualizador de 4 bandas." },
    { codigo: "AM004", categoria: "Amplificadores", nombre: "Amplificador Acústico 40W", marca: "Fishman", modelo: "Loudbox Mini", stock: 2, precio: 499990, descripcion: "60W, 2 canales, reverb y chorus incorporados." },
    { codigo: "MI001", categoria: "Micrófonos", nombre: "Micrófono Dinámico Cardioide", marca: "Shure", modelo: "SM58", stock: 8, precio: 149990, descripcion: "Estándar industria para voz en vivo." },
    { codigo: "MI002", categoria: "Micrófonos", nombre: "Micrófono Dinámico Instrumento", marca: "Shure", modelo: "SM57", stock: 6, precio: 139990, descripcion: "Ideal para captura de instrumentos y amplificadores." },
    { codigo: "MI003", categoria: "Micrófonos", nombre: "Micrófono Condensador", marca: "Audio-Tech.", modelo: "AT2020", stock: 4, precio: 199990, descripcion: "Cardioide, XLR, ideal para grabación en estudio." },
    { codigo: "MI004", categoria: "Micrófonos", nombre: "Micrófono USB de Condensador", marca: "Blue", modelo: "Yeti", stock: 5, precio: 299990, descripcion: "USB, 4 patrones polares, ideal para streaming y podcast." },
    { codigo: "PE001", categoria: "Pedales de Efectos", nombre: "Pedal Distorsión", marca: "Boss", modelo: "DS-1", stock: 7, precio: 79990, descripcion: "Clásico pedal de distorsión, 3 controles." },
    { codigo: "PE002", categoria: "Pedales de Efectos", nombre: "Pedal Reverb", marca: "Boss", modelo: "RV-6", stock: 4, precio: 179990, descripcion: "8 modos de reverb, control de shimmer." },
    { codigo: "PE003", categoria: "Pedales de Efectos", nombre: "Pedal Multi-efectos", marca: "Boss", modelo: "ME-80", stock: 2, precio: 349990, descripcion: "Diseño tipo pedalboard, 8 efectos simultáneos." },
    { codigo: "PE004", categoria: "Pedales de Efectos", nombre: "Pedal Tuner Cromático", marca: "Boss", modelo: "TU-3", stock: 8, precio: 89990, descripcion: "Afinador cromático, indicador de tono." },
    { codigo: "PE005", categoria: "Pedales de Efectos", nombre: "Pedal Delay", marca: "MXR", modelo: "Carbon Copy", stock: 4, precio: 179990, descripcion: "Delay analógico cálido, tiempo 600ms." },
    { codigo: "PE006", categoria: "Pedales de Efectos", nombre: "Pedal Overdrive", marca: "Ibanez", modelo: "TS9", stock: 6, precio: 99990, descripcion: "Tube Screamer clásico, sonido suave y orgánico." },
    { codigo: "AC001", categoria: "Accesorios", nombre: "Cuerdas Guitarra Eléctrica 09-42", marca: "Ernie Ball", modelo: "Super Slinky", stock: 25, precio: 8990, descripcion: "Juego 6 cuerdas, calibre ligero." },
    { codigo: "AC002", categoria: "Accesorios", nombre: "Cuerdas Guitarra Acústica 12-53", marca: "Ernie Ball", modelo: "Earthwood", stock: 20, precio: 10990, descripcion: "Bronce fósforo, sonido cálido." },
    { codigo: "AC003", categoria: "Accesorios", nombre: "Cuerdas Bajo 45-105", marca: "Ernie Ball", modelo: "Regular Slinky", stock: 12, precio: 14990, descripcion: "Cuerdas de níquel enrollado, set 4 cuerdas." },
    { codigo: "AC004", categoria: "Accesorios", nombre: "Púas de Guitarra x10 (0.73mm)", marca: "Fender", modelo: "351", stock: 50, precio: 3990, descripcion: "Celulosa, grosor medio." },
    { codigo: "AC005", categoria: "Accesorios", nombre: "Capotraste Guitarra", marca: "Dunlop", modelo: "Trigger", stock: 15, precio: 12990, descripcion: "Capotraste de resorte, compatible 6 cuerdas." },
    { codigo: "AC006", categoria: "Accesorios", nombre: "Afinador de Clip", marca: "Snark", modelo: "SN-5", stock: 20, precio: 8990, descripcion: "Afinador cromático de clip, pantalla giratoria." },
    { codigo: "AC007", categoria: "Accesorios", nombre: "Cable Instrumento 3m", marca: "Monster", modelo: "S100-I-3", stock: 15, precio: 12990, descripcion: "Cable trenzado, conectores dorados, 3 metros." },
    { codigo: "AC008", categoria: "Accesorios", nombre: "Cable Instrumento 6m", marca: "Monster", modelo: "S100-I-6", stock: 10, precio: 17990, descripcion: "Cable trenzado, conectores dorados, 6 metros." },
    { codigo: "AC009", categoria: "Accesorios", nombre: "Soporte Guitarra de Piso", marca: "Hercules", modelo: "GS302B", stock: 12, precio: 22990, descripcion: "Soporte plegable con enganche automático." },
    { codigo: "AC010", categoria: "Accesorios", nombre: "Soporte Guitarra de Pared", marca: "Hercules", modelo: "WAH-202", stock: 10, precio: 18990, descripcion: "Montaje a pared, enganche automático." },
    { codigo: "ES001", categoria: "Estudio y Grabación", nombre: "Interfaz de Audio 2x2 USB", marca: "Focusrite", modelo: "Scarlett Solo", stock: 4, precio: 149990, descripcion: "1 entrada XLR+instrumento, 2 salidas, 24bit/192kHz." },
    { codigo: "ES002", categoria: "Estudio y Grabación", nombre: "Auriculares de Estudio", marca: "Audio-Tech.", modelo: "ATH-M20x", stock: 6, precio: 79990, descripcion: "Circumaurales, respuesta 15Hz-20kHz." },
    { codigo: "ES003", categoria: "Estudio y Grabación", nombre: "Auriculares de Estudio Pro", marca: "Audio-Tech.", modelo: "ATH-M50x", stock: 4, precio: 219990, descripcion: "Referencia de industria, sonido neutro y detallado." },
    { codigo: "ES004", categoria: "Estudio y Grabación", nombre: "Monitor de Estudio 5\"", marca: "Yamaha", modelo: "HS5", stock: 2, precio: 349990, descripcion: "Altavoz activo, respuesta plana, ideal mezcla." },
    { codigo: "ES005", categoria: "Estudio y Grabación", nombre: "Pop Filter para Micrófono", marca: "Sennheiser", modelo: "MZP 40", stock: 8, precio: 14990, descripcion: "Doble malla, brazo flexible con clip." }
];

/* Listado-usuario*/

const USUARIOS = [
    {
        run: "123456785",
        nombres: "Camila",
        apellidos: "Rojas Muñoz",
        correo: "camila.rojas@gmail.com",
        region: "Valparaíso",
        comuna: "Viña del Mar",
        rol: "Administrador",
        direccion: "Av. Libertad 450"
    },
    {
        run: "198765432",
        nombres: "Matías",
        apellidos: "Fernández Soto",
        correo: "matias.fernandez@gmail.com",
        region: "Valparaíso",
        comuna: "Viña del Mar",
        rol: "Vendedor",
        direccion: "Calle Condell 120"
    },
    {
        run: "156789123",
        nombres: "Javiera",
        apellidos: "Contreras Díaz",
        correo: "javiera.contreras@duoc.cl",
        region: "Región Metropolitana",
        comuna: "Maipú",
        rol: "Cliente",
        direccion: "Pasaje Los Aromos 88"
    },
    {
        run: "145678912",
        nombres: "Ignacio",
        apellidos: "González Rojas",
        correo: "ignacio.gonzalez@gmail.com",
        region: "Región Metropolitana",
        comuna: "Santiago",
        rol: "Cliente",
        direccion: "Avenida Providencia 123"
    },
    {
        run: "134567891",
        nombres: "Valentina",
        apellidos: "Martínez López",
        correo: "valentina.martinez@gmail.com",
        region: "Valparaíso",
        comuna: "Viña del Mar",
        rol: "Vendedor",
        direccion: "Calle Los Leones 456"
    },
    {
        run: "123456789",
        nombres: "Sebastián",
        apellidos: "Pérez Torres",
        correo: "sebastian.perez@gmail.com",
        region: "Valparaíso",
        comuna: "Viña del Mar",
        rol: "Vendedor",
        direccion: "Calle Los Pinos 789"
    },
    {
        run: "112233445",
        nombres: "Isidora",
        apellidos: "Vargas Rojas",
        correo: "isidora.vargas@gmail.com",
        region: "Región Metropolitana",
        comuna: "Talagante",
        rol: "Cliente",
        direccion: "Calle Los Pinos 789"
    },
    {
        run: "223344556",
        nombres: "Diego",
        apellidos: "Castillo Fernández",
        correo: "diego.castillo@gmail.com",
        region: "Región Metropolitana",
        comuna: "Calera de tango",
        rol: "Cliente",
        direccion: "Calle Los Pinos 789"
    },
    {
        run: "334455667",
        nombres: "Antonia",
        apellidos: "Rojas Muñoz",
        correo: "antonia.rojas@gmail.com",
        region: "Valparaíso",
        comuna: "Viña del Mar",
        rol: "Administrador",
        direccion: "Calle Los Pinos 789"
    },
    {
        run: "445566778",
        nombres: "Tomás",
        apellidos: "González Pérez",
        correo: "tomas.gonzalez@gmail.com",
        region: "Región Metropolitana",
        comuna: "San bernardo",
        rol: "Cliente",
        direccion: "Calle Los Pinos 789"
    }
];

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
        const elementos = formRegistro.elements;
        const mensajeReg = document.querySelector("#mensaje-confirmacion-registro");

        const passCoincide = validador.coinciden(elementos["contraseña"]?.value, elementos["confirmar-contraseña"]?.value);
        const passLongitud = validador.esTextoValido(elementos["contraseña"]?.value, 4, 10);

        const validaciones = [
            {
                elemento: elementos["run-completo"] || elementos["run"],
                estado: validador.esRunValido((elementos["run-completo"] || elementos["run"])?.value),
                idError: "error-run",
                mensaje: "RUN inválido. Ingrese su RUN sin puntos ni guion (7 a 9 caracteres)."
            },
            {
                elemento: elementos["nombres"],
                estado: validador.esTextoValido(elementos["nombres"]?.value, 1, 50),
                idError: "error-nombres",
                mensaje: "Los nombres tienen un máximo de 50 caracteres."
            },
            {
                elemento: elementos["apellidos"],
                estado: validador.esTextoValido(elementos["apellidos"]?.value, 1, 100),
                idError: "error-apellidos",
                mensaje: "Los apellidos tienen un máximo de 100 caracteres."
            },
            {
                elemento: elementos["correo"],
                estado: validador.esCorreoValido(elementos["correo"]?.value) && (elementos["correo"]?.value.length <= 100),
                idError: "error-correo",
                mensaje: "Correo inválido. Solo dominios @duoc.cl, @profesor.duoc.cl, @gmail.com, @example.com."
            },
            {
                elemento: elementos["direccion-registro"] || elementos["direccion"],
                estado: validador.esTextoValido((elementos["direccion-registro"] || elementos["direccion"])?.value, 1, 300),
                idError: "error-direccion",
                mensaje: "La dirección tiene un máximo de 300 caracteres."
            },
            {
                elemento: elementos["region-registro"],
                estado: validador.esTextoValido(elementos["region-registro"]?.value),
                idError: "error-region",
                mensaje: "Por favor seleccione una región."
            },
            {
                elemento: elementos["comuna-registro"],
                estado: validador.esTextoValido(elementos["comuna-registro"]?.value),
                idError: "error-comuna",
                mensaje: "Por favor seleccione una comuna."
            },
            {
                elemento: elementos["contraseña"],
                estado: passLongitud,
                idError: "error-contraseña",
                mensaje: "La contraseña debe tener entre 4 y 10 caracteres."
            },
            {
                elemento: elementos["confirmar-contraseña"] || elementos["confirmarContra"],
                estado: passCoincide && validador.esTextoValido((elementos["confirmar-contraseña"] || elementos["confirmarContra"])?.value),
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

    const selectCategoria = form.querySelector("#categoria-producto");
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

const formEliminarProducto = document.querySelector("#form-eliminar-producto-admin");

if (formEliminarProducto) {
    formEliminarProducto.addEventListener("submit", (e) => {
        e.preventDefault();
        const elementos = formEliminarProducto.elements;
        const mensajeEliminar = document.querySelector("#mensaje-confirmacion-eliminar-producto-admin");

        const validaciones = [
            {
                elemento: elementos["codigo-producto"],
                estado: validador.esTextoValido(elementos["codigo-producto"]?.value, 3),
                idError: "error-codigo-producto",
                mensaje: "El código del producto debe tener al menos 3 caracteres."
            }
        ];

        let esFormularioValido = true;
        validaciones.forEach(({ elemento, estado, idError, mensaje }) => {
            UI.marcarCampo(elemento, estado, idError, mensaje);
            if (!estado) esFormularioValido = false;
        });

        if (esFormularioValido) {
            UI.mostrarMensaje(mensajeEliminar, "Producto eliminado correctamente.", true);
            formEliminarProducto.reset();
        } else {
            UI.mostrarMensaje(mensajeEliminar, "Por favor verifique el código ingresado.", false);
        }
    });
}

/* Registro y Edición de Usuario */
function validadorFormularioUsuario(idForm, idMensaje, mensajeExito, limpiarAlExito = true) {
    const form = document.querySelector(idForm);
    if (!form) return;

    const selectRegion = form.querySelector("#region-registro");
    const selectComuna = form.querySelector("#comuna-registro");

    if (selectRegion && selectComuna) {
        UI.poblarSelect(selectRegion, DATOS_REGIONES, "Seleccione su región");
        selectRegion.addEventListener("change", (e) => {
            const regionEncontrada = DATOS_REGIONES.find(r => r.nombre === e.target.value);
            const comunas = regionEncontrada ? regionEncontrada.comunas : [];
            UI.poblarSelect(selectComuna, comunas, "Seleccione su comuna");
        });
    }


    function obtenerValidaciones() {
        const elementos = form.elements;
        const contrasena = elementos["contraseña"]?.value ?? '';
        const confirmarContrasena = elementos["confirmar-contraseña"]?.value ?? '';
        const passLongitud = validador.esTextoValido(contrasena, 4, 10);
        const passCoincide = validador.coinciden(contrasena, confirmarContrasena);

        return [
            {
                elemento: elementos["run-completo"] || elementos["run"],
                estado: validador.esRunValido((elementos["run-completo"] || elementos["run"])?.value),
                idError: "error-run-completo",
                mensaje: "RUN inválido. Ingrese su RUN sin puntos ni guion (7 a 9 caracteres)."
            },
            {
                elemento: elementos["nombres"],
                estado: validador.esTextoValido(elementos["nombres"]?.value, 1, 50),
                idError: "error-nombres",
                mensaje: "Los nombres tienen un máximo de 50 caracteres."
            },
            {
                elemento: elementos["apellidos"],
                estado: validador.esTextoValido(elementos["apellidos"]?.value, 1, 100),
                idError: "error-apellidos",
                mensaje: "Los apellidos tienen un máximo de 100 caracteres."
            },
            {
                elemento: elementos["correo"],
                estado: validador.esCorreoValido(elementos["correo"]?.value) && (elementos["correo"]?.value.length <= 100),
                idError: "error-correo",
                mensaje: "Correo inválido. Solo dominios @duoc.cl, @profesor.duoc.cl, @gmail.com, @example.com."
            },
            {
                elemento: elementos["contraseña"],
                estado: passLongitud,
                idError: "error-contraseña",
                mensaje: "La contraseña debe tener entre 4 y 10 caracteres."
            },
            {
                elemento: elementos["confirmar-contraseña"] || elementos["confirmarContra"],
                estado: passCoincide && validador.esTextoValido((elementos["confirmar-contraseña"] || elementos["confirmarContra"])?.value),
                idError: "error-confirmar-contraseña",
                mensaje: "Las contraseñas no coinciden."
            },
            {
                elemento: elementos["region-registro"],
                estado: validador.esTextoValido(elementos["region-registro"]?.value),
                idError: "error-region-registro",
                mensaje: "Por favor seleccione una región."
            },
            {
                elemento: elementos["comuna-registro"],
                estado: validador.esTextoValido(elementos["comuna-registro"]?.value),
                idError: "error-comuna-registro",
                mensaje: "Por favor seleccione una comuna."
            },
            {
                elemento: elementos["rol"],
                estado: validador.esTextoValido(elementos["rol"]?.value),
                idError: "error-rol",
                mensaje: "Por favor seleccione un rol."
            },
            {
                elemento: elementos["direccion-registro"] || elementos["direccion"],
                estado: validador.esTextoValido((elementos["direccion-registro"] || elementos["direccion"])?.value, 1, 300),
                idError: "error-direccion-registro",
                mensaje: "La dirección tiene un máximo de 300 caracteres."
            }
        ];
    }

    function validarCampoEnVivo(elemento) {
        if (!elemento) return;
        const validaciones = obtenerValidaciones();
        const propia = validaciones.find(v => v.elemento === elemento);
        if (propia) {
            UI.marcarCampo(propia.elemento, propia.estado, propia.idError, propia.mensaje);
        }
    }


    Array.from(form.elements).forEach((campo) => {
        if (!campo.id) return;
        const evento = (campo.tagName === "SELECT") ? "change" : "input";
        campo.addEventListener(evento, () => validarCampoEnVivo(campo));
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const contenedorMensaje = document.querySelector(idMensaje);
        const validaciones = obtenerValidaciones();

        let esFormularioValido = true;
        validaciones.forEach(({ elemento, estado, idError, mensaje }) => {
            UI.marcarCampo(elemento, estado, idError, mensaje);
            if (!estado) esFormularioValido = false;
        });

        if (esFormularioValido) {
            UI.mostrarMensaje(contenedorMensaje, mensajeExito, true);
            if (limpiarAlExito) form.reset();
        } else {
            UI.mostrarMensaje(contenedorMensaje, "Hay errores en el formulario. Por favor verifique los campos marcados.", false);
        }
    });
}

validadorFormularioUsuario(
    "#form-registro-admin",
    "#mensaje-confirmacion-registro-admin",
    "Usuario registrado correctamente en el sistema.",
    true
);

validadorFormularioUsuario(
    "#form-editar-admin",
    "#mensaje-confirmacion-edicion",
    "Usuario editado correctamente en el sistema.",
    false
);

const formEliminarUsuario = document.querySelector("#form-eliminar-admin");

if (formEliminarUsuario) {
    const campoRun = formEliminarUsuario.elements["run-usuario"];

    campoRun.addEventListener("input", () => {
        UI.marcarCampo(
            campoRun,
            validador.esRunValido(campoRun.value),
            "error-run-usuario",
            "RUN inválido. Ingrese el RUN del usuario sin puntos ni guion (7 a 9 caracteres)."
        );
    });

    formEliminarUsuario.addEventListener("submit", (e) => {
        e.preventDefault();
        const elementos = formEliminarUsuario.elements;
        const mensajeEliminar = document.querySelector("#mensaje-confirmacion-eliminacion");

        const validaciones = [
            {
                elemento: elementos["run-usuario"],
                estado: validador.esRunValido(elementos["run-usuario"]?.value),
                idError: "error-run-usuario",
                mensaje: "RUN inválido. Ingrese el RUN del usuario sin puntos ni guion (7 a 9 caracteres)."
            }
        ];

        let esFormularioValido = true;
        validaciones.forEach(({ elemento, estado, idError, mensaje }) => {
            UI.marcarCampo(elemento, estado, idError, mensaje);
            if (!estado) esFormularioValido = false;
        });

        if (esFormularioValido) {
            UI.mostrarMensaje(mensajeEliminar, "Usuario eliminado correctamente.", true);
            formEliminarUsuario.reset();
        } else {
            UI.mostrarMensaje(mensajeEliminar, "Por favor verifique el RUN ingresado.", false);
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {

    const contenedorGrilla = document.querySelector(".grilla-productos");

    if (contenedorGrilla) {
        catalogoProductos.forEach(producto => {
            const divProducto = document.createElement("div");
            divProducto.classList.add("producto");

            const enlaceDetalle = document.createElement("a");
            enlaceDetalle.href = `detalle-producto.html?codigo=${producto.codigo}`;
            enlaceDetalle.style.textDecoration = "none";
            enlaceDetalle.style.color = "inherit";

            const imagen = document.createElement("img");
            imagen.src = "img/placeholder.png";
            imagen.alt = producto.nombre;

            const titulo = document.createElement("h3");
            titulo.textContent = `${producto.nombre} ${producto.marca} ${producto.modelo}`;

            const precio = document.createElement("p");
            precio.classList.add("precio");
            precio.textContent = "$" + producto.precio.toLocaleString('es-CL');

            enlaceDetalle.appendChild(imagen);
            enlaceDetalle.appendChild(titulo);
            enlaceDetalle.appendChild(precio);

            const botonCarrito = document.createElement("button");
            botonCarrito.classList.add("boton-catalogo-añadir-producto");
            botonCarrito.type = "button";
            botonCarrito.textContent = "Añadir al carrito";
            botonCarrito.dataset.codigo = producto.codigo;

            divProducto.appendChild(enlaceDetalle);
            divProducto.appendChild(botonCarrito);
            contenedorGrilla.appendChild(divProducto);
        });
    }

    const tituloDetalle = document.getElementById("detalle-titulo");

    if (tituloDetalle) {
        const parametros = new URLSearchParams(window.location.search);
        const codigoFiltro = parametros.get("codigo");

        if (!codigoFiltro) {
            tituloDetalle.textContent = "Producto no especificado";
            return;
        }

        const productoActivo = catalogoProductos.find(p => p.codigo === codigoFiltro);

        if (productoActivo) {
            document.getElementById("breadcrumb-nombre").textContent = productoActivo.nombre;

            tituloDetalle.textContent = productoActivo.nombre;

            const precioFormateado = "$" + productoActivo.precio.toLocaleString('es-CL');
            document.getElementById("detalle-precio").textContent = precioFormateado;

            document.getElementById("detalle-descripcion").textContent = productoActivo.descripcion;
            document.getElementById("detalle-imagen").alt = productoActivo.nombre;

            const botonCarrito = document.getElementById("boton-agregar-carrito");
            botonCarrito.disabled = false;
            botonCarrito.dataset.codigo = productoActivo.codigo;
        } else {
            tituloDetalle.textContent = "Producto no encontrado en el catálogo";
        }
    }
});

const carritoKey = "sv_carrito"

const carritoStorage = {
    obtener: () => {
        try {
            const datos = JSON.parse(localStorage.getItem(carritoKey));
            return Array.isArray(datos) ? datos : [];
        } catch (error) {
            return [];
        }
    },
    guardar: (carrito) => localStorage.setItem(carritoKey, JSON.stringify(carrito)),

    agregar: (codigo) => {
        const producto = catalogoProductos.find(p => p.codigo === codigo);
        if (!producto) return;

        let carrito = carritoStorage.obtener().filter(item => item && item.codigo);
        const itemExistente = carrito.find(item => item.codigo === codigo);

        if (itemExistente) {
            itemExistente.cantidad += 1;
        } else {
            carrito.push({
                codigo: producto.codigo,
                nombre: `${producto.nombre} ${producto.marca} ${producto.modelo}`,
                precio: producto.precio,
                cantidad: 1
            });
        }
        carritoStorage.guardar(carrito);
        actualizarContadorCarrito();
    },

    actualizarCantidad: (codigo, nuevaCantidad) => {
        let carrito = carritoStorage.obtener().filter(item => item && item.codigo);
        if (nuevaCantidad <= 0) {
            carrito = carrito.filter(item => item.codigo !== codigo);
        } else {
            const item = carrito.find(i => i.codigo === codigo);
            if (item) item.cantidad = nuevaCantidad;
        }
        carritoStorage.guardar(carrito);
    },

    quitar: (codigo) => {
        const carritoLimpio = carritoStorage.obtener().filter(item => item && item.codigo !== codigo);
        carritoStorage.guardar(carritoLimpio);
    },

    vaciar: () => carritoStorage.guardar([]),

    total: () => {
        const carrito = carritoStorage.obtener().filter(item => item && item.precio);
        return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    },

    totalItems: () => {
        const carrito = carritoStorage.obtener().filter(item => item && item.cantidad);
        return carrito.reduce((acc, item) => acc + item.cantidad, 0);
    }
};

function actualizarContadorCarrito() {
    const contador = document.querySelector('#contador-carrito')
    if (contador) contador.textContent = carritoStorage.totalItems()
}

document.addEventListener("DOMContentLoaded", actualizarContadorCarrito)

document.addEventListener("click", (e) => {
    const boton = e.target.closest("[data-codigo]")
    if (!boton) return

    const esBotonCatalogo = boton.classList.contains("boton-catalogo-añadir-producto");
    const esBotonDetalle = boton.id === "boton-agregar-carrito";

    if (esBotonCatalogo || esBotonDetalle) {
        e.preventDefault();
        carritoStorage.agregar(boton.dataset.codigo);

        const textoOriginal = boton.textContent;
        boton.textContent = "¡Agregado!";
        setTimeout(() => boton.textContent = textoOriginal, 1000);
    }
})

/*COMPRA */

const contenedorCarrito = document.querySelector("#carrito")
if (contenedorCarrito) {
    function renderizarCarrito() {
        const carrito = carritoStorage.obtener()
        const carritoVacioMsg = document.querySelector("#carrito-vacio")
        const totalCompra = document.querySelector("#total-compra")

        contenedorCarrito.querySelectorAll(".item-carrito").forEach(e1 => e1.remove())

        if (carrito.length === 0) {
            carritoVacioMsg.hidden = false
            totalCompra.textContent = "Total: $0"
            return
        }
        carritoVacioMsg.hidden = true

        carrito.forEach(item => {
            const fila = document.createElement("article");
            fila.className = "item-carrito";
            fila.innerHTML = `
                <p>${item.nombre}</p>
                <p>$${item.precio.toLocaleString('es-CL')} c/u</p>
                <div class="cantidad-carrito">
                    <button type="button" class="btn-restar" data-codigo="${item.codigo}">-</button>
                    <span>${item.cantidad}</span>
                    <button type="button" class="btn-sumar" data-codigo="${item.codigo}">+</button>
                </div>
                <p>Subtotal: $${(item.precio * item.cantidad).toLocaleString('es-CL')}</p>
                <button type="button" class="btn-quitar" data-codigo="${item.codigo}">Quitar</button>
            `
            contenedorCarrito.appendChild(fila);
        })

        totalCompra.textContent = "Total: $" + carritoStorage.total().toLocaleString('es-CL')
    }

    renderizarCarrito()

    contenedorCarrito.addEventListener("click", (e) => {
        const codigo = e.target.dataset.codigo;
        if (!codigo) return;

        const item = carritoStorage.obtener().find(i => i.codigo === codigo);
        if (e.target.classList.contains("btn-sumar") && item) {
            carritoStorage.actualizarCantidad(codigo, item.cantidad + 1);
        } else if (e.target.classList.contains("btn-restar") && item) {
            carritoStorage.actualizarCantidad(codigo, item.cantidad - 1);
        } else if (e.target.classList.contains("btn-quitar")) {
            carritoStorage.quitar(codigo);
        }
        renderizarCarrito();
        actualizarContadorCarrito();
    });

    const grupoDireccion = document.querySelector("#direccion");
    document.querySelectorAll('input[name="entrega"]').forEach(radio => {
        radio.addEventListener("change", () => {
            const esDespacho = document.querySelector('input[name="entrega"]:checked').value === "despacho";
            grupoDireccion.hidden = !esDespacho;
            document.querySelector("#direccion-compra").required = esDespacho;
        });
    });

    const formCompra = document.querySelector("#form-compra");
    if (formCompra) {
        formCompra.addEventListener("submit", (e) => {
            e.preventDefault();
            const elementos = formCompra.elements;
            const confirmacion = document.querySelector("#confirmacion-compra");
            const esDespacho = elementos["entrega"].value === "despacho";

            const validaciones = [
                {
                    elemento: elementos["nombre"],
                    estado: validador.esTextoValido(elementos["nombre"]?.value, 3, 100),
                    idError: "error-nombre-compra",
                    mensaje: "Ingresa tu nombre completo (mínimo 3 caracteres)."
                },
                {
                    elemento: elementos["correo"],
                    estado: validador.esCorreoValido(elementos["correo"]?.value) && (elementos["correo"]?.value.length <= 100),
                    idError: "error-correo-compra",
                    mensaje: "Ingresa un correo válido."
                },
                {
                    elemento: elementos["telefono"],
                    estado: validador.esTelefonoValido(elementos["telefono"]?.value) && elementos["telefono"]?.value.trim() !== '',
                    idError: "error-telefono-compra",
                    mensaje: "Ingresa un teléfono válido (8 a 15 dígitos)."
                },
                {
                    elemento: elementos["pago"],
                    estado: validador.esTextoValido(elementos["pago"]?.value),
                    idError: "error-pago-compra",
                    mensaje: "Selecciona una forma de pago."
                }
            ];

            if (esDespacho) {
                validaciones.push({
                    elemento: elementos["direccion"],
                    estado: validador.esTextoValido(elementos["direccion"]?.value, 5, 300),
                    idError: "error-direccion-compra",
                    mensaje: "Ingresa una dirección de despacho válida."
                });
            }

            let esFormularioValido = true;
            validaciones.forEach(({ elemento, estado, idError, mensaje }) => {
                UI.marcarCampo(elemento, estado, idError, mensaje);
                if (!estado) esFormularioValido = false;
            });

            if (carritoStorage.obtener().length === 0) {
                UI.mostrarMensaje(confirmacion, "No puedes confirmar un pedido sin productos en el carrito.", false);
                return;
            }

            if (esFormularioValido) {
                UI.mostrarMensaje(confirmacion, "¡Pedido confirmado! Te contactaremos para coordinar la entrega.", true);
                carritoStorage.vaciar();
                formCompra.reset();
                renderizarCarrito();
                actualizarContadorCarrito();
            } else {
                UI.mostrarMensaje(confirmacion, "Revisa los campos marcados.", false);
            }
        })
    }
}

/*Listado de Usarios y Productos*/

function renderizarTabla(selectorTbody, datos, columnas) {
    const cuerpoTabla = document.querySelector(selectorTbody);
    if (!cuerpoTabla) return;

    cuerpoTabla.textContent = '';

    datos.forEach(item => {
        const fila = document.createElement("tr");

        columnas.forEach(columna => {
            const td = document.createElement("td");

            const valor = typeof columna === 'function' ? columna(item) : (item[columna] ?? '-');

            td.textContent = valor;
            fila.appendChild(td);
        })
        cuerpoTabla.appendChild(fila);
    });
}

function renderizarListadoUsuarios() {
    const columnasUsuarios = [
        'run',
        'nombres',
        'apellidos',
        'correo',
        'region',
        'comuna',
        'rol',
        'direccion'
    ];
    renderizarTabla('#cuerpo-tabla-usuarios-admin', USUARIOS, columnasUsuarios);
}

function renderizarListadoProductos() {
    const columnasProductos = [
        'codigo',
        'categoria',
        'nombre',
        'marca',
        'modelo',
        'stock',
        producto => producto.stockCritico ?? '-',
        producto => '$' + producto.precio.toLocaleString('es-CL'),
        'descripcion'
    ];
    renderizarTabla('#cuerpo-tabla-productos-admin', catalogoProductos, columnasProductos);
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarListadoUsuarios();
    renderizarListadoProductos();
});