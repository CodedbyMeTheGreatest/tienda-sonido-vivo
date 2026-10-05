import { createContext, useContext, useState } from 'react'
import * as usuarioService from '../services/usuarioService'

const UsuariosContext = createContext(null)

export function UsuariosProvider({ children }) {

  const [usuarios, setUsuarios] = useState(() => usuarioService.listarUsuarios())

  function crear(datos) {
    usuarioService.crearUsuario(datos)
    setUsuarios(usuarioService.listarUsuarios())
  }

  function actualizar(run, cambios) {
    usuarioService.actualizarUsuario(run, cambios)
    setUsuarios(usuarioService.listarUsuarios())
  }

  function eliminar(run) {
    usuarioService.eliminarUsuario(run)
    setUsuarios(usuarioService.listarUsuarios())
  }

  function recargar() {
    setUsuarios(usuarioService.listarUsuarios())
  }

  return (
    <UsuariosContext.Provider value={{ usuarios, crear, actualizar, eliminar, recargar }}>
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