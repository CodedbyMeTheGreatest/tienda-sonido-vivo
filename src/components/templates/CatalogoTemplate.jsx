import CatalogoProducto from "../organisms/CatalogoProducto";

function CatalogoTemplate(props) {
    return (
        <div>
            <header>
            {/*Encabezado*/}
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