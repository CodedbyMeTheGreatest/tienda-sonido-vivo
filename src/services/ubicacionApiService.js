import { api } from './api'

export async function listarRegionesApi() {
  const r = await api.get('/regiones')
  return r.data
}

export async function listarComunasApi() {
  const r = await api.get('/comunas')
  return r.data
}