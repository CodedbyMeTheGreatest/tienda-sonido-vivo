import CatalogoProducto from "../organisms/CatalogoProducto";
import Navbar from "../organisms/Navbar";

function CatalogoTemplate(props) {
    return (
        <div>
            <header>
            <Navbar cantidadCarrito={props.cantidadCarrito} />
            </header>
            <main>
                <CatalogoProducto dataProductos={props.productos}></CatalogoProducto>
            </main>
            <footer>
            {/*Pie de Pagina*/}
            </footer>
        </div>
    );
}

export default CatalogoTemplate;