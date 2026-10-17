export const ESTADOS_PEDIDO = ['En preparación', 'Despachado', 'Entregado']
export const ENTREGAS = ['Despacho a domicilio', 'Retiro en tienda']
export const ENTREGA_DESPACHO = ENTREGAS[0]

export function puedeAgregar(cantidadActual, stock) {
  return stock > 0 && cantidadActual < stock
}

export function aLineasPedido(items) {
  return items.map(({ producto, cantidad }) => ({
    codigo: producto.codigo,
    nombre: producto.nombre,
    precio: producto.precio,
    cantidad,
  }))
}

export function calcularTotal(lineas) {
  return lineas.reduce((suma, l) => suma + l.precio * l.cantidad, 0)
}

export function validarStock(items, productos) {
  return items.flatMap(({ producto, cantidad }) => {
    const actual = productos.find((p) => p.codigo === producto.codigo)
    const disponible = actual ? actual.stock : 0
    return cantidad > disponible ? [{ nombre: producto.nombre, disponible }] : []
  })
}