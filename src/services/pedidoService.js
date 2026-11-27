import { api } from './api'

export async function listarPedidos() {
  const { data } = await api.get('/pedidos')
  return data
}

export async function crearPedido(datos) {
  const payload = {
    tipoEntrega: datos.tipoEntrega,
    direccion: datos.direccion,
    items: datos.items.map((it) => ({
      codigo: it.codigo ?? it.producto?.codigo,
      cantidad: Number(it.cantidad),
    })),
  }
  const { data } = await api.post('/pedidos', payload)
  return data
}

export async function actualizarEstadoPedido(id, estado) {
  const { data } = await api.patch(`/pedidos/${id}/estado`, { estado })
  return data
}

export async function obtenerPedido(id) {
  const { data } = await api.get(`/pedidos/${id}`)
  return data
}