export function productoDesdeApi(p) {
  return {
    id: p.id,
    codigo: p.codigo,
    categoria: p.categoria,
    nombre: p.nombre,
    descripcion: p.descripcion,
    precio: Number(p.precio),
    stock: Number(p.stock),
    marca: p.marca,
    modelo: p.modelo,
    marcaId: p.marcaId ?? p.marca_id,
    modeloId: p.modeloId ?? p.modelo_id
  }
}

export function productoRequestDto(v) {
  return {
    codigo: v.codigo.trim().toUpperCase(),
    categoria: v.categoria,
    nombre: v.nombre.trim(),
    descripcion: v.descripcion.trim(),
    precio: Number(v.precio),
    stock: Number(v.stock),
    marcaId: v.marcaId,
    modeloId: v.modeloId
  }
}