import { Col, Container, Row } from "react-bootstrap";
import PlantillaPublica from "../components/templates/PlantillaPublica";

function Inicio(){
    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <PlantillaPublica>
                    </PlantillaPublica>
                </Col>
            </Row>
        </Container>
    );
}

export default Inicio;