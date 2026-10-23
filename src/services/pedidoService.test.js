import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  listarPedidos,
  obtenerPedido,
  crearPedido,
  actualizarEstadoPedido,
} from './pedidoService.js' 

import { listarProductos, actualizarProducto } from './productoService'
import { aLineasPedido, calcularTotal, validarStock } from '../utils/pedidos'

vi.mock('./productoService', () => ({
  listarProductos: vi.fn(),
  actualizarProducto: vi.fn(),
}))

vi.mock('../utils/pedidos', () => ({
  ESTADOS_PEDIDO: ['En preparación', 'Despachado', 'Entregado'],
  aLineasPedido: vi.fn(),
  calcularTotal: vi.fn(),
  validarStock: vi.fn(),
}))

describe('pedidoService', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks() 
  })

  describe('listarPedidos y leer', () => {
    it('retorna un arreglo vacío si no hay pedidos guardados', () => {
      expect(listarPedidos()).toEqual([])
    })

    it('retorna los pedidos guardados correctamente', () => {
      const pedidosGuardados = [{ id: 'PED-0001', total: 5000 }]
      localStorage.setItem('pedidos', JSON.stringify(pedidosGuardados))
      
      expect(listarPedidos()).toEqual(pedidosGuardados)
    })

    it('retorna un arreglo vacío si el JSON en localStorage está corrupto', () => {
      localStorage.setItem('pedidos', '{ json_invalido ]')
      expect(listarPedidos()).toEqual([])
    })
  })

  describe('obtenerPedido', () => {
    it('retorna el pedido correspondiente al ID', () => {
      localStorage.setItem('pedidos', JSON.stringify([{ id: 'PED-0002', estado: 'Despachado' }]))
      const pedido = obtenerPedido('PED-0002')
      
      expect(pedido).toBeDefined()
      expect(pedido?.estado).toBe('Despachado')
    })

    it('retorna null si el ID no existe', () => {
      expect(obtenerPedido('PED-9999')).toBeNull()
    })
  })

  describe('crearPedido', () => {
    const clienteMock = { run: '11111111-1', nombre: 'Juan' }
    const itemsMock = [{ producto: { codigo: 'GA001', precio: 1000 }, cantidad: 2 }]
    const entregaMock = 'Despacho a domicilio'

    it('lanza un error si el carrito está vacío', () => {
      expect(() => 
        crearPedido({ cliente: clienteMock, items: [], entrega: entregaMock })
      ).toThrow('El carrito está vacío.')
    })

    it('lanza un error con detalle si no hay stock suficiente', () => {
      validarStock.mockReturnValue([{ nombre: 'Guitarra Acústica', disponible: 1 }])
      listarProductos.mockReturnValue([{ codigo: 'GA001', stock: 1 }])

      expect(() => 
        crearPedido({ cliente: clienteMock, items: itemsMock, entrega: entregaMock })
      ).toThrow('Stock insuficiente: Guitarra Acústica (disponibles: 1).')
    })

    it('crea el pedido, descuenta el stock y lo guarda correctamente si todo es válido', () => {
  
      validarStock.mockReturnValue([])
      listarProductos.mockReturnValue([{ codigo: 'GA001', stock: 5 }])
      aLineasPedido.mockReturnValue([{ codigo: 'GA001', precio: 1000, cantidad: 2 }])
      calcularTotal.mockReturnValue(2000)

      const pedido = crearPedido({ 
        cliente: clienteMock, 
        items: itemsMock, 
        entrega: entregaMock 
      })

   
      expect(pedido.id).toBe('PED-0001')
      expect(pedido.clienteRun).toBe('11111111-1')
      expect(pedido.total).toBe(2000)
      expect(pedido.estado).toBe('En preparación')
      expect(pedido.fecha).toBeDefined() 

  
      expect(actualizarProducto).toHaveBeenCalledWith('GA001', { stock: 3 })
      expect(actualizarProducto).toHaveBeenCalledTimes(1)

   
      const guardados = JSON.parse(localStorage.getItem('pedidos'))
      expect(guardados).toHaveLength(1)
      expect(guardados[0].id).toBe('PED-0001')
    })
  })

  describe('actualizarEstadoPedido', () => {
    it('actualiza el estado de un pedido existente', () => {
      const pedidoInicial = { id: 'PED-0001', estado: 'En preparación' }
      localStorage.setItem('pedidos', JSON.stringify([pedidoInicial]))

      const actualizado = actualizarEstadoPedido('PED-0001', 'Entregado')
      
      expect(actualizado?.estado).toBe('Entregado')
      
      const guardados = JSON.parse(localStorage.getItem('pedidos'))
      expect(guardados[0].estado).toBe('Entregado')
    })

    it('retorna null si el pedido a actualizar no existe', () => {
      const resultado = actualizarEstadoPedido('PED-9999', 'Entregado')
      expect(resultado).toBeNull()
    })
  })
})