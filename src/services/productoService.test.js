import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from './productoService.js'


vi.mock('../data/Productos.json', () => ({
  default: [
    {
      codigo: 'GA001',
      nombre: 'Guitarra Acústica',
      precio: 120000,
      stock: 5,
    },
    {
      codigo: 'TE002',
      nombre: 'Teclado MIDI',
      precio: 85000,
      stock: 3,
    },
  ],
}))

describe('productoService', () => {
 
  beforeEach(() => {
    localStorage.clear()
  })

  describe('listarProductos', () => {
    it('retorna los productos iniciales si localStorage está vacío', () => {
      const productos = listarProductos()
      expect(productos).toHaveLength(2)
      expect(productos[0].codigo).toBe('GA001')
    })
    it('retorna los productos guardados en localStorage si ya existen', () => {
      const guardados = [{ codigo: 'BA003', nombre: 'Bajo Eléctrico', precio: 200000, stock: 2 }]
      localStorage.setItem('productos', JSON.stringify(guardados))

      const productos = listarProductos()
      expect(productos).toEqual(guardados)
    })
  })

  describe('obtenerProducto', () => {
    it('retorna el producto correspondiente al código ingresado', () => {
      const producto = obtenerProducto('TE002')
      expect(producto).toBeDefined()
      expect(producto?.nombre).toBe('Teclado MIDI')
    })
    it('retorna null si el código del producto no existe', () => {
      const producto = obtenerProducto('XX999')
      expect(producto).toBeNull()
    })
  })

  describe('crearProducto', () => {
    it('agrega un nuevo producto exitosamente si el código no está repetido', () => {
      const nuevo = {
        codigo: 'PE004',
        nombre: 'Pedal de Efecto',
        precio: 45000,
        stock: 10,
      }
      const creado = crearProducto(nuevo)
      expect(creado).toEqual(nuevo)
      expect(listarProductos()).toHaveLength(3)
    })
    it('lanza un error si se intenta crear un producto con un código que ya existe', () => {
      const repetido = {
        codigo: 'GA001',
        nombre: 'Otra Guitarra',
        precio: 150000,
        stock: 1,
      }

      expect(() => crearProducto(repetido)).toThrow(
        'Ya existe un producto con el código GA001'
      )
    })
  })

  describe('actualizarProducto', () => {
    it('modifica los campos indicados del producto especificado', () => {
      const actualizado = actualizarProducto('GA001', { precio: 130000, stock: 4 })
      expect(actualizado?.precio).toBe(130000)
      expect(actualizado?.stock).toBe(4)
      expect(actualizado?.nombre).toBe('Guitarra Acústica') 
    })
    it('retorna null si se intenta actualizar un producto que no existe', () => {
      const resultado = actualizarProducto('XX999', { precio: 100 })
      expect(resultado).toBeNull()
    })
  })

  describe('eliminarProducto', () => {
    it('elimina un producto existente por su código', () => {
      eliminarProducto('GA001')
      const productos = listarProductos()
      expect(productos).toHaveLength(1)
      expect(productos[0].codigo).toBe('TE002')
    })
    it('no hace nada ni lanza error si se intenta eliminar un código que no existe', () => {
      eliminarProducto('XX999')
      const productos = listarProductos()
      expect(productos).toHaveLength(2) 
    })
  })
})