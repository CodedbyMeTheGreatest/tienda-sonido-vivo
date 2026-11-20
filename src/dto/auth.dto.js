export function registroRequestDto(v) {
  return {
    run: v.run.trim().toUpperCase(),
    nombre: v.nombres.trim(),
    apellidos: v.apellidos.trim(),
    email: v.correo.trim().toLowerCase(),
    password: v.contrasenia,
    direccion: v.direccion.trim()
  }
}

export function loginRequestDto(correo, contrasenia) {
  return { email: correo.trim().toLowerCase(), password: contrasenia }
}

export function sesionDesdeRespuesta(r) {
  return {
    token: r.token,
    usuario: { id: r.usuario.id, nombres: r.usuario.nombre, rol: r.usuario.tipo }
  }
}