const PATRONES = {
    correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    telefono: /^\+?[0-9]{8,15}$/,
    run: /^\d{6,8}[0-9K]$/i
}
const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

export function esCampoVacio(valor){
    return !valor || valor.trim() === '';
}

export function esTextoValido(valor, min = 1, max = Infinity) {
    if(esCampoVacio(valor)) return false;
    const texto = valor.trim();
    return texto.length >= min && texto.length <= max;
}

export function esCorreoValido(correo) {
    if (esCampoVacio(correo)) return false;
    const valor = correo.trim();
    
    if (!PATRONES.correo.test(valor)) return false;
    const dominio = valor.split('@')[1]?.toLowerCase();
    return DOMINIOS_PERMITIDOS.includes(dominio);
}

export function esRunValido(run) { 
    return PATRONES.run.test((run || '').trim()); 
}

export function esTelefonoValido(telefono) { 
    const tel = (telefono || '').trim();
    return tel === '' || PATRONES.telefono.test(tel); 
}

export function coincidenContrasenias(contr1, contr2) { 
    return (contr1 || '').trim() === (contr2 || '').trim();
}

export function esNumeroValido(valor, min = 0, max = Infinity) {
    if (valor === '' || valor === null || valor === undefined) return false;
    const num = Number(valor);
    return !Number.isNaN(num) && num >= min && num <= max;
}