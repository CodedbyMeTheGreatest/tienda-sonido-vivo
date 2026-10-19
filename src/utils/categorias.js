export function categoriasDe(productos) {
  return [...new Set(productos.map((p) => p.categoria))]
}