import { createContext, useContext, useState } from 'react'
import { autenticarUsuario } from '../services/usuarioService'

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

  function iniciarSesion(correo, contrasena) {
    const encontrado = autenticarUsuario(correo, contrasena)
    if (!encontrado) return false

    localStorage.setItem(SESION_KEY, JSON.stringify(encontrado))
    setUsuario(encontrado)
    return true
  }

  function cerrarSesion() {
    localStorage.removeItem(SESION_KEY)
    setUsuario(null)
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