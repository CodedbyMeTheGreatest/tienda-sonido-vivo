import { describe, it, expect, expectTypeOf } from 'vitest'
import { esCampoVacio, esCorreoValido, esRunValido, esTelefonoValido, coincidenContrasenias, esNumeroValido, esTextoValido } from './validaciones.js'

describe('esCampoVacio', () => {
    it('retorna true si el campo esta vacio', () => {
        expect(esCampoVacio('')).toBe(true)
    })

    it('retorna false si el campo tiene contenido', () => {
        expect(esCampoVacio('Jane Doe')).toBe(false)
    })
})

describe('esTextoValido', () => {

    it('retorna false si el valor tiene menos caracteres que el minimo entregado', () => {
        expect(esTextoValido('Jane', 8)).toBe(false)
    })

    it('retorna false si el valor tiene mas caracteres que el maximo entregado'), () => {
        expect (esTextoValido('Jane Doe', 4)).toBe(false)
    }

    it('retorna true si el valor es de tipo String', () => {
        expect(esTextoValido('Jane Doe', 4, 15)).toBe(true)
    })
})

describe('esCorreoValido', () => {
    it('retorna false si el valor no es un correo', () => {
        expect(esCorreoValido('janedoe')).toBe(false)
    })
    
    it('retorna false si el correo no tiene el dominio permitido', () => {
        expect(esCorreoValido('janedoe@hotmail.com')).toBe(false)
    })

    it('retorna true si el valor es un correo', () => {
        expect(esCorreoValido('janedoe@duoc.cl')).toBe(true)
    })
})

describe('esRunValido', () => {
    it('retorna false si el valor no es valido con el patron de run', () => {
        expect(esRunValido('Run de Jane')).toBe(false)
    })

    it('retorna true si el valor es valido con el patron de run', () => {
        expect(esRunValido('19345986')).toBe(true)
    })  
})

describe('esTelefonoValido', () => {
    it('retorna false si el valor no es valido con el patron de telefono', () => {
        expect(esTelefonoValido('Numero de Jane')).toBe(false)
    })

    it('retorna true si el valor es valido con el patron de telefono', () => {
        expect(esTelefonoValido('+938355772')).toBe(true)
    })
})

describe('coincidenContrasenias', () => {
    it('retorna false si los dos valores no coindicen entre si', () => {
        expect(coincidenContrasenias('admin1234', 'admin1324')).toBe(false)
    })

    it('retorna true si los dos valores coindicen entre si', () => {
        expect(coincidenContrasenias('admin1234', 'admin1234')).toBe(true)
    })
})

describe('esNumeroValido', () => {
    it('retorna false si el valor no es un numero', () => {
        expect(esNumeroValido('/67')).toBe(false)
    })

    it('retorna false si el numero es menor que el minimo asignado', () => {
        expect(esNumeroValido(67, 68)).toBe(false)
    })

    it('retorna false si el numero es mayor que el maximo asignado', () => {
        expect(esNumeroValido(67, 0, 66)).toBe(false)
    })

    it('retorna true si el valor es un numero dentro del rango entregado', () => {
        expect(esNumeroValido(13, 1, 50)).toBe(true)
    })
})
