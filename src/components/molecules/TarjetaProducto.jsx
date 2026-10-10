import { Card } from "react-bootstrap";
import Boton from "../atoms/Boton"
import Precio from "../atoms/Precio"
import {Insignia} from "../atoms/Insignia"

function TarjetaProducto(props) {
    const producto = props.producto
    const sinStock = producto.stock === 0

    return (
        <Card as="article" className="producto">
            <a href={props.href}>
                {
                    producto.imagen && (
                        <Card.Img variant="top" src={producto.productoImagenRuta} alt={props.productoTextAlt} />
                    )}
                <Card.Body>
                    <Insignia tone="neutral">{producto.categoria}</Insignia>
                    <Card.Title as="h3">{props.productoNombreCompleto}</Card.Title>
                    <Precio precio={producto.precio} />
                    <p className="mb-3">
                        {sinStock ? (
                            <Insignia tone="warning">Sin stock</Insignia>
                        ) : (
                            <Insignia tone="success">{producto.stock} disponibles</Insignia>
                        )}
                    </p>
                </Card.Body>
            </a>
            <Boton className="boton-catalogo-añadir-producto" tipo="button" texto="Añadir al Carrito" alHacerClick={() => props.onAdd(producto)}></Boton>
        </Card >
    );
}

export default TarjetaProducto;