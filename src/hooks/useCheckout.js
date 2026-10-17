import { useState } from 'react'
import { esCampoVacio, esTextoValido } from '../utils/validaciones'
import { ENTREGA_DESPACHO } from '../utils/pedidos'

export default function useCheckout(direccionInicial, alConfirmar) {
  const [valores, setValores] = useState({ tipoEntrega: ENTREGA_DESPACHO, direccion: direccionInicial })
  const [errores, setErrores] = useState({})

  const alCambiar = (e) => {
    const { id, value } = e.target
    setValores((prev) => ({ ...prev, [id]: value }))
    if (errores[id]) setErrores((prev) => ({ ...prev, [id]: '' }))
  }

  const alEnviar = (e) => {
    e.preventDefault()
    const nuevos = {}

    if (esCampoVacio(valores.tipoEntrega)) {
      nuevos.tipoEntrega = 'Seleccione una forma de entrega.'
    } else if (valores.tipoEntrega === ENTREGA_DESPACHO && !esTextoValido(valores.direccion, 1, 100)) {
      nuevos.direccion = 'La dirección de despacho es obligatoria (máximo 100 caracteres).'
    }

    if (Object.keys(nuevos).length > 0) {
      setErrores(nuevos)
      return
    }
    setErrores({})
    alConfirmar(valores)
  }

  return { valores, errores, alCambiar, alEnviar }
}