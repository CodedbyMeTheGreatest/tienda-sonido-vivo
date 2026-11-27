import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import {
  listarProductosApi, crearProductoApi, actualizarProductoApi,
  actualizarStockApi, eliminarProductoApi
} from '../services/productoApiService'
import { obtenerMensajeError } from '../services/authService'
import * as productoService from '../services/productoService'

const ProductosContext = createContext(null)

export function ProductosProvider({ children }) {

  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const recargar = useCallback(async () => {
    setError('')
    try {
      setProductos(await listarProductosApi())
    } catch (e) {
      console.error(e)
      setError(obtenerMensajeError(e))
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => { recargar() }, [recargar])

  async function ejecutar(operacion) {
    try { await operacion() }
    catch (e) { throw new Error(obtenerMensajeError(e)) }
    await recargar()
  }

  const crear = (datos) => ejecutar(() => crearProductoApi(datos))
  const actualizar = (id, datos) => ejecutar(() => actualizarProductoApi(id, datos))
  const actualizarStock = (id, stock) => ejecutar(() => actualizarStockApi(id, stock))
  const eliminar = (id) => ejecutar(() => eliminarProductoApi(id))


  return (
    <ProductosContext.Provider value={{ productos, cargando, error, crear, actualizar, eliminar, recargar, actualizarStock }}>
      {children}
    </ProductosContext.Provider>
  )
}

export function useProductos() {
  const contexto = useContext(ProductosContext)
  if (!contexto) {
    throw new Error('useProductos debe usarse dentro de un ProductosProvider')
  }
  return contexto
}
