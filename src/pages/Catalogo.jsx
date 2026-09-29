import {Container, Row, Col} from "react-bootstrap";
import CatalogoTemplate from "../components/templates/CatalogoTemplate";
import dataProductos from "../data/Productos.json"

function Catalogo() { 
    return (
        <Container>
            <Row>
                <Col xs={12} ms={8} lg={6}>
                    <CatalogoTemplate productos={dataProductos}></CatalogoTemplate>
                </Col>
            </Row>
        </Container>
    );
}

export default Catalogo;