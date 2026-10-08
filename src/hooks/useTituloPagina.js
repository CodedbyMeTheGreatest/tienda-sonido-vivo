import { useEffect } from 'react'

export function useTituloPagina(titulo) {
  useEffect(() => {
    document.title = `${titulo} | Tienda Sonido Vivo`
  }, [titulo])
}