export function usuarioDesdeApi(u) {
  return {
    id: u.id,
    run: u.run,
    nombres: u.nombre,
    apellidos: u.apellidos,
    correo: u.email,
    rol: u.tipo,
    fechaNacimiento: u.fecha_nacimiento ? String(u.fecha_nacimiento).slice(0, 10) : '',
    activo: u.activo
  }
}

export function actualizarUsuarioDto(v) {
  return {
    nombre: v.nombres?.trim(),
    apellidos: v.apellidos?.trim(),
    email: v.correo?.trim().toLowerCase(),
    fechaNacimiento: v.fechaNacimiento || undefined,
    tipo: v.rol
  }
}

export function crearUsuarioDto(v) {
  return {
    run: v.run.trim().toUpperCase(),
    nombre: v.nombres.trim(),
    apellidos: v.apellidos.trim(),
    email: v.correo.trim().toLowerCase(),
    password: v.contrasena,
    tipo: v.rol
  }
}