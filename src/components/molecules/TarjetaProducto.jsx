import { Card } from "react-bootstrap";
import Boton from "../atoms/Boton";
import Precio from "../atoms/Precio";
import {useCart} from "../../context/CarritoContext";

function TarjetaProducto(props) {
    const producto = props.producto
    const sinStock = producto.stock === 0

    return (
        <Card as="article" className="producto">
            <a href={props.href}>
                {
                    producto.imagen && (
                        <Card.Img variant="top" src={producto.productoImagenRuta} alt={productoTextAlt} />
                    )}
                <Card.Body>
                    <Badge tone="neutral">{producto.categoria}</Badge>
                    <Card.Title as="h3">{props.productoNombreCompleto}</Card.Title>
                    <Precio precio={producto.precio} />
                    <p className="mb-3">
                        {sinStock ? (
                            <Badge tone="warning">Sin stock</Badge>
                        ) : (
                            <Badge tone="success">{producto.stock} disponibles</Badge>
                        )}
                    </p>
                </Card.Body>
            </a>
            <Boton className="boton-catalogo-añadir-producto" tipo="button" texto="Añadir al Carrito" onClick={() => props.onAdd(producto)}></Boton>
        </Card >
    );
}

export default TarjetaProducto;