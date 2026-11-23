import { api } from './api'

export async function registrarUsuario(dto) {
  const respuesta = await api.post('/auth/registro', dto)
  return respuesta.data
}

export async function iniciarSesionApi(dto) {
  const respuesta = await api.post('/auth/login', dto)
  return respuesta.data // { mensaje, token, usuario: { id, nombre, tipo } }
}

export function obtenerMensajeError(error) {
  if (error.response) {
    const datos = error.response.data
    if (datos && typeof datos.error === 'string') return datos.error
    return 'La API respondió con un error (' + error.response.status + ').'
  }
  if (error.code === 'ECONNABORTED') return 'La API tardó demasiado. Intenta de nuevo.'
  if (error.code === 'ECONNABORTED') return 'La API tardó demasiado. Intenta de nuevo.'
  if (error.request) return 'No fue posible contactar la API. Revisa la conexión y su dirección.'
  return error.message || 'Ocurrió un error inesperado.'

}