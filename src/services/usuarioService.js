import usuariosIniciales from '../data/Usuarios.json'

const CLAVE = 'usuarios'

function leer() {
  const guardado = localStorage.getItem(CLAVE)

  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(usuariosIniciales))
    return [...usuariosIniciales]
  }

  return JSON.parse(guardado)
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

export function listarUsuarios() {
  return leer()
}

export function obtenerUsuario(run) {
  return leer().find((u) => u.run === run) ?? null
}

export function crearUsuario(datos) {
  const lista = leer()

  const yaExiste = lista.some((u) => u.run === datos.run)
  if (yaExiste) {
    throw new Error(`Ya existe un usuario con el RUN ${datos.run}`)
  }

  guardar([...lista, datos])
  return datos
}

export function actualizarUsuario(run, cambios) {
  const lista = leer().map((u) => (u.run === run ? { ...u, ...cambios } : u))
  guardar(lista)
  return lista.find((u) => u.run === run) ?? null
}

export function eliminarUsuario(run) {
  guardar(leer().filter((u) => u.run !== run))
}