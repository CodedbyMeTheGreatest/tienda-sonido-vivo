import { createContext, useContext, useState } from 'react'
import { iniciarSesionApi, cerrarSesionApi, obtenerMensajeError } from '../services/authService'
import { loginRequestDto, sesionDesdeRespuesta } from '../dto/auth.dto'
import { TOKEN_KEY } from '../services/api'

const SESION_KEY = 'sv_sesion'
const SesionContext = createContext(null)

function leerSesion() {
  try {
    return JSON.parse(localStorage.getItem(SESION_KEY))
  } catch {
    return null
  }
}

export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(leerSesion)

  async function iniciarSesion(correo, contrasena) {
    try {
      const respuesta = await iniciarSesionApi(loginRequestDto(correo, contrasena))
      const sesion = sesionDesdeRespuesta(respuesta)
      const usuarioSesion = { ...sesion.usuario, correo: correo.trim().toLowerCase() }

      localStorage.setItem(TOKEN_KEY, sesion.token)
      localStorage.setItem(SESION_KEY, JSON.stringify(usuarioSesion))
      setUsuario(usuarioSesion)
      return true
    } catch (e) {
      if (e.response && e.response.status === 401) return false
      throw new Error(obtenerMensajeError(e))
    }
  }

  async function cerrarSesion() {
    try {
      if (localStorage.getItem(TOKEN_KEY)) {
        await api.post('/auth/logout');
      }
    } catch {
      // Si el token ya estaba vencido, no importa, igual cerramos sesión local
    } finally {
      localStorage.removeItem(SESION_KEY)
      localStorage.removeItem(TOKEN_KEY)
      setUsuario(null)
    }
  }

  return (
    <SesionContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </SesionContext.Provider>
  )
}

export function useSesion() {
  const contexto = useContext(SesionContext)
  if (!contexto) {
    throw new Error('useSesion debe usarse dentro de un SesionProvider')
  }
  return contexto
}