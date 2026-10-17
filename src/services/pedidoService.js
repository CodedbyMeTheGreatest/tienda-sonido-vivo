import { listarProductos, actualizarProducto } from './productoService'
import { ESTADOS_PEDIDO, aLineasPedido, calcularTotal, validarStock } from '../utils/pedidos'

const CLAVE = 'pedidos'

function leer() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) ?? []
  } catch {
    return []
  }
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

export function listarPedidos() {
  return leer()
}

export function obtenerPedido(id) {
  return leer().find((p) => p.id === id) ?? null
}

export function crearPedido({ cliente, items, entrega }) {
  if (items.length === 0) {
    throw new Error('El carrito está vacío.')
  }

  const productos = listarProductos()
  const problemas = validarStock(items, productos)
  if (problemas.length > 0) {
    const detalle = problemas.map((p) => `${p.nombre} (disponibles: ${p.disponible})`).join(', ')
    throw new Error(`Stock insuficiente: ${detalle}.`)
  }

  items.forEach(({ producto, cantidad }) => {
    const actual = productos.find((p) => p.codigo === producto.codigo)
    actualizarProducto(producto.codigo, { stock: actual.stock - cantidad })
  })

  const lista = leer()
  const lineas = aLineasPedido(items)
  const pedido = {
    id: `PED-${String(lista.length + 1).padStart(4, '0')}`,
    fecha: new Date().toISOString(),
    clienteRun: cliente.run,
    items: lineas,
    total: calcularTotal(lineas),
    entrega,
    estado: ESTADOS_PEDIDO[0],
  }

  guardar([...lista, pedido])
  return pedido
}

export function actualizarEstadoPedido(id, estado) {
  const lista = leer().map((p) => (p.id === id ? { ...p, estado } : p))
  guardar(lista)
  return lista.find((p) => p.id === id) ?? null
}