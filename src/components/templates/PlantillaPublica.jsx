import { Container } from "react-bootstrap";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

function PlantillaPublica(props) {
    return (
        <div className="pagina">
            <Navbar/>
            <Container as="main">
                {props.children}
            </Container>
            <Footer></Footer>
        </div>

    );
}

export default PlantillaPublica;