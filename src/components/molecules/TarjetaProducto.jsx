import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Boton from "../atoms/Boton"
import Precio from "../atoms/Precio"
import { Insignia } from "../atoms/Insignia"
import Imagen from "../atoms/Imagen";

function TarjetaProducto(props) {
    const producto = props.producto
    const sinStock = producto.stock === 0

    return (
        <Card as="article" className="producto">
            <Link to={props.to}>
            {props.productoImagenRuta && (
                    <Imagen
                        src={props.productoImagenRuta}
                        alt={props.productoTextAlt || producto.nombre}
                        className="imagen-tarjeta-producto"
                    />
                )}
                <Card.Body>
                    <Insignia tone="marca">{producto.categoria}</Insignia>
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
            </Link>
            <Boton className="boton-catalogo-añadir-producto" tipo="button" texto="Añadir al Carrito" alHacerClick={() => props.onAdd(producto)} deshabilitado={sinStock}></Boton>
        </Card >
    );
}

export default TarjetaProducto;