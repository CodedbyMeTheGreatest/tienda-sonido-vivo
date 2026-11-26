import { api } from './api'
import { usuarioDesdeApi, actualizarUsuarioDto, crearUsuarioDto } from '../dto/usuario.dto'

export async function crearUsuarioApi(valores) {
  const r = await api.post('/usuarios', crearUsuarioDto(valores))
  return usuarioDesdeApi(r.data)
}

export async function listarUsuariosApi() {
  const r = await api.get('/usuarios')
  return r.data.map(usuarioDesdeApi)
}

export async function actualizarUsuarioApi(id, valores) {
  const r = await api.put(`/usuarios/${id}`, actualizarUsuarioDto(valores))
  return usuarioDesdeApi(r.data)
}

export async function desactivarUsuarioApi(id) {
  await api.delete(`/usuarios/${id}`)
}
export async function activarUsuarioApi(id) {
  await api.patch(`/usuarios/${id}/activar`)
}