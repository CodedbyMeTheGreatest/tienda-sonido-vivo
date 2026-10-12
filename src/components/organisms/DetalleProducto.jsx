import { Row, Col } from "react-bootstrap";
import Imagen from "../atoms/Imagen";
import Precio from "../atoms/Precio";
import Label from "../atoms/Label";
import Boton from "../atoms/Boton";
import Breadcrumb from "../molecules/MigasDePan";
import FichaCodigoStock from "../molecules/FichaCodigoStock";
import ControlCantidad from "../molecules/ControlCantidad";
import imagen from "../../assets/placeholder.png"


function DetalleProducto(props) {
 const imagenUrl = props.imagenUrl || imagen;
  const nombre = props.nombre || "Nombre del producto";
  const descripcion = props.descripcion || "Sin descripción disponible";
  const precio = props.precio || 0;
  const codigo = props.codigo || "N/A";
  const stock = props.stock || 0;
  const cantidad = props.cantidad || 1;
  const itemsBreadcrumb = props.itemsBreadcrumb || [];

  return (
    <div className="detalle-producto">
      <Breadcrumb items={itemsBreadcrumb} />

      <Row className="mt-3">
        <Col xs={12} md={6} className="d-flex justify-content-center align-items-center mb-3 mb-md-0">
          <Imagen
            src={imagenUrl}
            alt={nombre}
            className="imagen-detalle-producto"
          />
        </Col>

        <Col xs={12} md={6}>
          <h1 id="detalle-titulo-producto">{nombre}</h1>
          <p className="descripcion-detalle-producto">{descripcion}</p>
          
          <Precio precio={precio} />
          
          <FichaCodigoStock codigo={codigo} stock={stock} />

          <div className="bloque-compra ">
            <Label paraId="cantidad-input" texto="" />
            <ControlCantidad
              cantidad={cantidad}
              maximo={stock}
              onIncrement={props.onIncrement}
              onDecrement={props.onDecrement}
            />
          </div>

          <Boton
            texto="Añadir al carrito"
            className="boton-detalle-añadir-producto"
            alHacerClick={props.onAdd}
            deshabilitado={stock <= 0}
          />
        </Col>
      </Row>
    </div>
  );
}

export default DetalleProducto;