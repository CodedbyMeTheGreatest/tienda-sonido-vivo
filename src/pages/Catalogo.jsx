import {Container, Row, Col} from "react-bootstrap";
import productos from "../data/Productos.json"
import CatalogoProducto from "../components/organisms/CatalogoProducto";

function Catalogo() { 
    return (
        <Container>
            <Row>
                <Col xs={12} md={8} lg={6}>
                    <CatalogoProducto dataProductos={productos}></CatalogoProducto>
                </Col>
            </Row>
        </Container>
    );
}

export default Catalogo;