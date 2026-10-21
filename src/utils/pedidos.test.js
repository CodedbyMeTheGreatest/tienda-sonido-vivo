import {describe,it,expect} from 'vitest'
import { limitarCantidad, puedeAgregar, aLineasPedido, calcularTotal, validarStock } from './pedidos.js'

const guitarra = { codigo: 'GA001', nombre: 'Guitarra Folk', precio: 129990, stock: 8 }

describe('limitarCantidad', () => {
    it('deja la cantidad igual si esta bajo el stock', () => {
        expect(limitarCantidad(3, 8)).toBe(3)
    })

    it('limita la cantidad al stock si lo supera', () => {
        expect(limitarCantidad(10, 8)).toBe(8)
    })

    it('retorna 0 si el producto no tiene stock', () => {
        expect(limitarCantidad(2, 0)).toBe(0)
    })
})

describe('puedeAgregar', () => {
    it('retorna true si la cantidad actual esta bajo el stock', () => {
        expect(puedeAgregar(7, 8)).toBe(true)
    })

    it('retorna false si la cantidad actual ya alcanzo el stock', () => {
        expect(puedeAgregar(8, 8)).toBe(false)
    })

    it('retorna false si el producto no tiene stock', () => {
        expect(puedeAgregar(0, 0)).toBe(false)
    })
})

describe('calcularTotal', () => {
    it('suma precio por cantidad de cada linea', () => {
        const lineas = [{ precio: 1000, cantidad: 2 }, { precio: 500, cantidad: 3 }]
        expect(calcularTotal(lineas)).toBe(3500)
    })

    it('retorna 0 si no hay lineas', () => {
        expect(calcularTotal([])).toBe(0)
    })
})

describe('aLineasPedido', () => {
    it('convierte los items del carrito en lineas planas del pedido', () => {
        const items = [{ producto: guitarra, cantidad: 2 }]
        expect(aLineasPedido(items)).toEqual([
            { codigo: 'GA001', nombre: 'Guitarra Folk', precio: 129990, cantidad: 2 },
        ])
    })
})

describe('validarStock', () => {
    const items = [{ producto: guitarra, cantidad: 5 }]

    it('retorna una lista vacia si hay stock suficiente', () => {
        expect(validarStock(items, [{ codigo: 'GA001', stock: 8 }])).toEqual([])
    })

    it('informa los productos sin stock suficiente', () => {
        expect(validarStock(items, [{ codigo: 'GA001', stock: 3 }])).toEqual([
            { nombre: 'Guitarra Folk', disponible: 3 },
        ])
    })

    it('considera sin stock un producto que ya no existe', () => {
        expect(validarStock(items, [])).toEqual([{ nombre: 'Guitarra Folk', disponible: 0 }])
    })
})