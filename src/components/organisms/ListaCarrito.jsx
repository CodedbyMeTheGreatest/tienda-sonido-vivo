import { useCart } from '../../context/CarritoContext'
import { Link } from 'react-router-dom'

function ListaCarrito() {
  const { items, increment, decrementar, eliminar, vaciar, totalPrecio } = useCart()


  if (items.length === 0) {
    return (
      <div className="text-center">
        <p>Tu carrito está vacío.</p>
        <Link to="/catalogo" className="btn btn-primary">Ir al catálogo</Link>
      </div>
    )
  }

  return (
    <>
      <ul className="list-group mb-3">
        {items.map(({ producto, cantidad }) => (
          <li key={producto.codigo} className="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <strong>{producto.nombre}</strong>
              <div>${producto.precio.toLocaleString('es-CL')} c/u</div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-outline-secondary btn-sm" onClick={() => decrementar(producto.codigo)}>−</button>
              <span>{cantidad}</span>
              <button className="btn btn-outline-secondary btn-sm" onClick={() => increment(producto.codigo)} disabled={cantidad >= producto.stock}>+</button>
              <span className="ms-3">${(producto.precio * cantidad).toLocaleString('es-CL')}</span>
              <button className="btn btn-outline-danger btn-sm" onClick={() => eliminar(producto.codigo)}>Quitar</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-outline-danger" onClick={vaciar}>Vaciar carrito</button>
        <h3 className="h5 mb-0">Total: ${totalPrecio.toLocaleString('es-CL')}</h3>
      </div>
      
    </>
  )
}

export default ListaCarrito;