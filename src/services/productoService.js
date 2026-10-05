// productoService: aquí vive el CRUD (Crear, Leer, Actualizar, Eliminar) de los productos.
// Son funciones de JavaScript puro: no usan React, así que se pueden probar solas.

import productosIniciales from '../data/Productos.json'

const CLAVE = 'productos'

function leer() {
  const guardado = localStorage.getItem(CLAVE)

  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(productosIniciales))
    return [...productosIniciales]
  }

  return JSON.parse(guardado)
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

export function listarProductos() {
  return leer()
}

export function obtenerProducto(codigo) {
  return leer().find((p) => p.codigo === codigo) ?? null
}

export function crearProducto(datos) {
  const lista = leer()

  const yaExiste = lista.some((p) => p.codigo === datos.codigo)
  if (yaExiste) {
    throw new Error(`Ya existe un producto con el código ${datos.codigo}`)
  }

  guardar([...lista, datos])
  return datos
}

export function actualizarProducto(codigo, cambios) {
  const lista = leer().map((p) => (p.codigo === codigo ? { ...p, ...cambios } : p))
  guardar(lista)
  return lista.find((p) => p.codigo === codigo) ?? null
}

export function eliminarProducto(codigo) {
  guardar(leer().filter((p) => p.codigo !== codigo))
}
