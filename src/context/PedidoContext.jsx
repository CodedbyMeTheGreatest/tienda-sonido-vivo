import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import * as pedidoService from '../services/pedidoService'
import { useSesion } from './SesionContext'

const PedidosContext = createContext(null)

export function PedidosProvider({ children }) {
  const { usuario } = useSesion()
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(false)

  const recargar = useCallback(async () => {
    if (!usuario) {
      setPedidos([])
      return
    }
    setCargando(true)
    try {
      const lista = await pedidoService.listarPedidos()
      setPedidos(lista)
    } catch {
      setPedidos([])
    } finally {
      setCargando(false)
    }
  }, [usuario])

  useEffect(() => {
    recargar()
  }, [recargar])

  async function crear(datos) {
    const pedido = await pedidoService.crearPedido(datos)
    setPedidos((prev) => [pedido, ...prev])
    return pedido
  }

  async function cambiarEstado(id, estado) {
    const actualizado = await pedidoService.actualizarEstadoPedido(id, estado)
    setPedidos((prev) => prev.map((p) => (p.id === actualizado.id ? actualizado : p)))
    return actualizado
  }

  return (
    <PedidosContext.Provider value={{ pedidos, cargando, crear, cambiarEstado, recargar }}>
      {children}
    </PedidosContext.Provider>
  )
}

export function usePedidos() {
  const contexto = useContext(PedidosContext)
  if (!contexto) {
    throw new Error('usePedidos debe usarse dentro de un PedidosProvider')
  }
  return contexto
}