import { Container, Row, Col } from "react-bootstrap";
import productos from "../data/Productos.json"
import CatalogoProducto from "../components/organisms/CatalogoProducto";
import PlantillaPublica from "../components/templates/PlantillaPublica";

function Catalogo() {

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <PlantillaPublica>
                        <CatalogoProducto dataProductos={productos}></CatalogoProducto>
                    </PlantillaPublica>
                </Col>
            </Row>
        </Container>
    );
}

export default Catalogo;