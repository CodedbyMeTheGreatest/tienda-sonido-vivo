import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSesion } from '../context/SesionContext'

export default function RutaProtegida({ roles }) {
  const { usuario } = useSesion()
  const ubicacion = useLocation()

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: ubicacion }} />
  }
  if (roles && !roles.includes(usuario.rol)) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}