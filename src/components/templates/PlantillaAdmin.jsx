import { Container } from "react-bootstrap";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

function PlantillaAdmin(props) {

    return (
        <div className="pagina">
            <Navbar/>
            <Container as="main" className="admin-container">
                {props.children}
            </Container>
            <Footer></Footer>
        </div>

    );
}

export default PlantillaAdmin;