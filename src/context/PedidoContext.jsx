import { createContext, useContext, useState } from 'react'
import * as pedidoService from '../services/pedidoService'

const PedidosContext = createContext(null)

export function PedidosProvider({ children }) {
  const [pedidos, setPedidos] = useState(() => pedidoService.listarPedidos())

  function crear(datos) {
    const pedido = pedidoService.crearPedido(datos)
    setPedidos(pedidoService.listarPedidos())
    return pedido
  }

  function cambiarEstado(id, estado) {
    pedidoService.actualizarEstadoPedido(id, estado)
    setPedidos(pedidoService.listarPedidos())
  }

  return (
    <PedidosContext.Provider value={{ pedidos, crear, cambiarEstado }}>
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