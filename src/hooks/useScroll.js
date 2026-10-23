import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useScroll() {
  const { hash, key } = useLocation()

  useEffect(() => {
    if (!hash) return
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }, [hash, key])
}