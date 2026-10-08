import { Card } from "react-bootstrap";
import Boton from "../atoms/Boton";
import Precio from "../atoms/Precio";
function TarjetaProducto(props) {
    return (
        <Card as="article" className="producto">
            <a href={props.href}>
                <img src={props.productoImagenRuta} alt={props.productoTextAlt} />
                <h3>{props.productoNombreCompleto}</h3>
                <Precio precio={props.productoPrecio}></Precio>
            </a>
            <Boton className="boton-catalogo-añadir-producto" tipo="button" texto="Añadir al Carrito" dataCodigo={props.productoCodigo}></Boton>
        </Card>
    );
}

export default TarjetaProducto;