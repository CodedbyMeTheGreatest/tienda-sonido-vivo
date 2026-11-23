import { createContext, useContext, useState, useCallback } from 'react'
import { obtenerMensajeError } from '../services/authService'
import { listarUsuariosApi, crearUsuarioApi, actualizarUsuarioApi, desactivarUsuarioApi } from '../services/usuarioApiService'
import * as usuarioService from '../services/usuarioService'

const UsuariosContext = createContext(null)

export function UsuariosProvider({ children }) {

  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const recargar = useCallback(async () => {
    setCargando(true)
    setError('')
    try {
      setUsuarios(await listarUsuariosApi())
    } catch (e) {
      setError(obtenerMensajeError(e))
    } finally {
      setCargando(false)
    }
  }, [])

  async function crear(datos) {
    try { await crearUsuarioApi(datos) }
    catch (e) { throw new Error(obtenerMensajeError(e)) }
    await recargar()
  }


  async function actualizar(id, cambios) {
    try {
      await actualizarUsuarioApi(id, cambios)
    }catch(e) {throw new Error(obtenerMensajeError(e))}
    await recargar()
  }

  async function desactivar(id) {
    try{
      await desactivarUsuarioApi(id)
    }catch(e) {throw new Error(obtenerMensajeError(e))}
    await recargar()
  }
  
  return (
    <UsuariosContext.Provider value={{ usuarios, cargando, error, recargar, actualizar, desactivar, crear }}>
      {children}
    </UsuariosContext.Provider>
  )
}

export function useUsuarios() {
  const contexto = useContext(UsuariosContext)
  if (!contexto) {
    throw new Error('useUsuarios debe usarse dentro de un UsuariosProvider')
  }
  return contexto
}