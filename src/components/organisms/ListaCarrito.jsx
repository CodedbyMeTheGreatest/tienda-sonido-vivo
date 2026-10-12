import { Link } from 'react-router-dom'
import ItemCarrito from '../molecules/ItemCarrito';
import ResumenCarrito from '../molecules/ResumenCarrito';

function ListaCarrito(props) {
  if (props.items.length === 0) {
    return (
      <div className="carrito-vacio">
        <p>Tu carrito está vacío.</p>
        <Link to="/catalogo" className="boton-carrito boton-carrito-primario">Ir al catálogo</Link>
      </div>
    )
  }

  return (
    <>
      <ul className="carrito-lista">
        {props.items.map((item) => (
          <ItemCarrito
            key={item.producto.codigo}
            item={item}
            onIncrement={props.onIncrement}
            onDecrement={props.onDecrement}
            onRemove={props.onRemove}
          />
        ))}
      </ul>
       <ResumenCarrito total={props.total} onClear={props.onClear}/>    
    </>
  )
}

export default ListaCarrito;