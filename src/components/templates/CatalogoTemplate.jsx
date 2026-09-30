import CatalogoProducto from "../organisms/CatalogoProducto";
import Footer from "../organisms/Footer";
import Navbar from "../organisms/Navbar";

function CatalogoTemplate(props) {
    return (
        <div className = "pagina">
            <Navbar cantidadCarrito={props.cantidadCarrito} />
            <main>
                <CatalogoProducto dataProductos={props.productos}></CatalogoProducto>
            </main>
            <Footer/>
        </div>
    );
}

export default CatalogoTemplate;