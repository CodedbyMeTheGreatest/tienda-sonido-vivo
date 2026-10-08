import { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext(null)

  export function CarritoProvider(props) {
    const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("carrito")) ?? []
    } catch {
      return []
    }
  })

    useEffect(() => {
      localStorage.setItem("carrito", JSON.stringify(items))
    }, [items])

  function añadir(producto) {
    setItems((actual) => {
      const existente = actual.find((i) => i.producto.codigo === producto.codigo)
      if (existente) {
        if (existente.cantidad >= producto.stock) return actual
        return actual.map((i) =>
          i.producto.codigo === producto.codigo ? { ...i, cantidad: i.cantidad + 1 } : i,
        )
      }
      return [...actual, { producto, cantidad: 1 }]
    })
  }

  function increment(codigo) {
    setItems((actual) =>
      actual.map((i) =>
        i.producto.codigo === codigo && i.cantidad < i.producto.stock
          ? { ...i, cantidad: i.cantidad + 1 }
          : i,
      ),
    )
  }

  function eliminar(codigo) {
    setItems((actual) => actual.filter((i) => i.producto.codigo !== codigo))
  }



  function decrementar(codigo) {
  setItems((actual) =>
    actual
      .map((i) => (i.producto.codigo === codigo ? { ...i, cantidad: i.cantidad - 1 } : i))
      .filter((i) => i.cantidad > 0),
  )
  }

  function vaciar() {
    setItems([])
  }

  const totalItems = items.reduce((suma, i) => suma + i.cantidad, 0)
  const totalPrecio = items.reduce((suma, i) => suma + i.producto.precio * i.cantidad, 0)

  const valor = { items, añadir, eliminar, increment, decrementar, vaciar, totalItems, totalPrecio }

  return <CarritoContext.Provider value={valor}>{props.children}</CarritoContext.Provider>
}

export function useCart() {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCart debe usarse dentro de un CarritoProvider')
  }
  return contexto
}