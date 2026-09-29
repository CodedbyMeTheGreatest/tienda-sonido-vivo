import { Link } from "react-router-dom";
import iconoCarrito from "../../assets/carrito.png";

function EnlaceCarrito(props) {
  const cantidad = props.cantidad || 0;
  const mostrarContador = cantidad > 0;

  return (
    <Link to={props.to} className="enlace-carrito" aria-label="carrito">
      <img src={iconoCarrito} alt="carrito" className="imagen-carrito" />
      {mostrarContador && (
        <span className="contador-carrito">{cantidad}</span>
      )}
    </Link>
  );
}

export default EnlaceCarrito;