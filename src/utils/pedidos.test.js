import { describe, it, expect, beforeEach, vi } from 'vitest'
import { api } from '../services/api'
import {
  listarPedidos,
  obtenerPedido,
  crearPedido,
  actualizarEstadoPedido,
} from '../services/pedidoService.js'

vi.mock('../services/api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}))

describe('pedidoService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('listarPedidos', () => {
    it('retorna la lista de pedidos desde el backend', async () => {
      const pedidosMock = [{ id: 1, total: 5000 }]
      api.get.mockResolvedValueOnce({ data: pedidosMock })

      const resultado = await listarPedidos()

      expect(api.get).toHaveBeenCalledWith('/pedidos')
      expect(resultado).toEqual(pedidosMock)
    })
  })

  describe('obtenerPedido', () => {
    it('retorna el pedido correspondiente al ID', async () => {
      const pedidoMock = { id: 2, estado: 'Despachado' }
      api.get.mockResolvedValueOnce({ data: pedidoMock })

      const resultado = await obtenerPedido(2)

      expect(api.get).toHaveBeenCalledWith('/pedidos/2')
      expect(resultado).toEqual(pedidoMock)
    })
  })

  describe('crearPedido', () => {
    it('envía el payload formateado al backend y retorna el pedido creado', async () => {
      const pedidoCreado = { id: 10, estado: 'En preparación', total: 2000 }
      api.post.mockResolvedValueOnce({ data: pedidoCreado })

      const resultado = await crearPedido({
        tipoEntrega: 'Despacho a domicilio',
        direccion: 'Av. Principal 123',
        items: [{ producto: { codigo: 'GA001', precio: 1000 }, cantidad: 2 }],
      })

      expect(api.post).toHaveBeenCalledWith('/pedidos', {
        tipoEntrega: 'Despacho a domicilio',
        direccion: 'Av. Principal 123',
        items: [{ codigo: 'GA001', cantidad: 2 }],
      })
      expect(resultado).toEqual(pedidoCreado)
    })
  })

  describe('actualizarEstadoPedido', () => {
    it('envía el PATCH con el nuevo estado y retorna el pedido actualizado', async () => {
      const actualizado = { id: 1, estado: 'Entregado' }
      api.patch.mockResolvedValueOnce({ data: actualizado })

      const resultado = await actualizarEstadoPedido(1, 'Entregado')

      expect(api.patch).toHaveBeenCalledWith('/pedidos/1/estado', { estado: 'Entregado' })
      expect(resultado).toEqual(actualizado)
    })
  })
})