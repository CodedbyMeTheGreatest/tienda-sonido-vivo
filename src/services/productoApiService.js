import { api } from './api'
import { productoDesdeApi, productoRequestDto } from '../dto/producto.dto'

export async function listarProductosApi() {
  const r = await api.get('/productos')
  return r.data.map(productoDesdeApi)
}
export async function crearProductoApi(valores) {
  const r = await api.post('/productos', productoRequestDto(valores))
  return productoDesdeApi(r.data)
}
export async function actualizarProductoApi(id, valores) {
  const r = await api.put(`/productos/${id}`, productoRequestDto(valores))
  return productoDesdeApi(r.data)
}
export async function actualizarStockApi(id, stock) {
  const r = await api.patch(`/productos/${id}/stock`, { stock })
  return productoDesdeApi(r.data)
}
export async function eliminarProductoApi(id) {
  await api.delete(`/productos/${id}`)
}
export async function listarMarcasApi() {
  const r = await api.get('/catalogo/marcas')
  return r.data
}
export async function listarModelosApi(marcaId) {
  const r = await api.get('/catalogo/modelos', { params: { marcaId } })
  return r.data
}