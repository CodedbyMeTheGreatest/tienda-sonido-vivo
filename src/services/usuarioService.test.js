import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  autenticarUsuario,
} from './usuariosService.js'


vi.mock('../data/Usuarios.json', () => ({
  default: [
    {
      run: '11111111-1',
      nombre: 'Juan Perez',
      correo: 'juan@sonidovivo.cl',
      contrasena: 'pass123',
    },
    {
      run: '22222222-2',
      nombre: 'Maria Soto',
      correo: 'maria@sonidovivo.cl',
      contrasena: 'clave456',
    },
  ],
}))

describe('usuariosService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('listarUsuarios', () => {
    it('retorna los usuarios iniciales si localStorage esta vacio', () => {
      const usuarios = listarUsuarios()
      expect(usuarios).toHaveLength(2)
      expect(usuarios[0].run).toBe('11111111-1')
    })

    it('retorna los usuarios guardados en localStorage si ya existen', () => {
      const personalizandos = [{ run: '33333333-3', nombre: 'Pedro' }]
      localStorage.setItem('usuarios', JSON.stringify(personalizandos))

      const usuarios = listarUsuarios()
      expect(usuarios).toEqual(personalizandos)
    })
  })

  describe('obtenerUsuario', () => {
    it('retorna el usuario correspondiente al RUN ingresado', () => {
      const usuario = obtenerUsuario('11111111-1')
      expect(usuario).toBeDefined()
      expect(usuario?.nombre).toBe('Juan Perez')
    })

    it('retorna null si el RUN no existe', () => {
      const usuario = obtenerUsuario('99999999-9')
      expect(usuario).toBeNull()
    })
  })

  describe('crearUsuario', () => {
    it('agrega un nuevo usuario exitosamente si no esta repetido', () => {
      const nuevo = {
        run: '33333333-3',
        nombre: 'Carlos Ruiz',
        correo: 'carlos@sonidovivo.cl',
        contrasena: '789',
      }

      const creado = crearUsuario(nuevo)
      expect(creado).toEqual(nuevo)
      expect(listarUsuarios()).toHaveLength(3)
    })

    it('lanza un error si el RUN ya existe', () => {
      const repetidoRun = {
        run: '11111111-1',
        nombre: 'Otro Juan',
        correo: 'otro@sonidovivo.cl',
      }

      expect(() => crearUsuario(repetidoRun)).toThrow(
        'Ya existe un usuario con el RUN 11111111-1'
      )
    })

    it('lanza un error si el correo ya existe (sin importar mayúsculas/minúsculas)', () => {
      const repetidoCorreo = {
        run: '44444444-4',
        nombre: 'Juan Clon',
        correo: 'JUAN@SONIDOVIVO.CL',
      }

      expect(() => crearUsuario(repetidoCorreo)).toThrow(
        'Ya existe un usuario con el correo JUAN@SONIDOVIVO.CL'
      )
    })
  })

  describe('actualizarUsuario', () => {
    it('modifica los campos indicados del usuario especificado', () => {
      const actualizado = actualizarUsuario('11111111-1', { nombre: 'Juan Updated' })
      expect(actualizado?.nombre).toBe('Juan Updated')
      expect(actualizado?.correo).toBe('juan@sonidovivo.cl')
    })

    it('retorna null si se intenta actualizar un RUN inexistente', () => {
      const resultado = actualizarUsuario('99999999-9', { nombre: 'Nadie' })
      expect(resultado).toBeNull()
    })
  })

  describe('eliminarUsuario', () => {
    it('elimina un usuario existente por su RUN', () => {
      eliminarUsuario('11111111-1')
      const usuarios = listarUsuarios()
      expect(usuarios).toHaveLength(1)
      expect(usuarios[0].run).toBe('22222222-2')
    })
  })

  describe('autenticarUsuario', () => {
    it('retorna el usuario sin la contraseña si las credenciales son correctas', () => {
      const usuario = autenticarUsuario('juan@sonidovivo.cl', 'pass123')
      expect(usuario).toBeDefined()
      expect(usuario?.run).toBe('11111111-1')
      expect(usuario).not.toHaveProperty('contrasena')
    })

    it('retorna null si el correo o la contraseña son incorrectos', () => {
      expect(autenticarUsuario('juan@sonidovivo.cl', 'clave_erronea')).toBeNull()
      expect(autenticarUsuario('desconocido@sonidovivo.cl', 'pass123')).toBeNull()
    })
  })
})