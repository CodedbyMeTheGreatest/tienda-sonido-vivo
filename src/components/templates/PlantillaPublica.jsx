import {Outlet} from "react-router-dom";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

function PlantillaPublica(props) {
    return (
        <div className="pagina">
            <Navbar cantidadCarrito={props.cantidadCarrito} />
            <main>
                <Outlet/>
            </main>
            <Footer></Footer>
        </div>

    );
}

export default PlantillaPublica;