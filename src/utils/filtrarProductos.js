export function filtrarProductos(productos, filtros = {}) {
  const buscado = (filtros.texto || '').trim().toLowerCase()
  const categoria = filtros.categoria || ''

  return productos.filter((p) => {
    const coincideTexto = buscado === '' || p.nombre.toLowerCase().includes(buscado)
    const coincideCategoria = categoria === '' || p.categoria === categoria
    return coincideTexto && coincideCategoria
  })
}   