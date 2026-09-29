import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

function LoginTemplate(props) {
    return (
        <div>
            <Navbar cantidadCarrito={props.cantidadCarrito} />
            <main>

                {/* props.children renderiza el Organismo pasado como contenido hijo */}
                {props.children}

            </main>
            <Footer/>
        </div>
    );
}

export default LoginTemplate;