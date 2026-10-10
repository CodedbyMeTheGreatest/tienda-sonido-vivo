import { useNavigate, useParams } from 'react-router-dom'
import productos from "../data/Productos.json"
import { useProductos } from "../context/ProductContext"
import CatalogoProducto from "../components/organisms/CatalogoProducto";
import PlantillaPublica from "../components/templates/PlantillaPublica";

function Catalogo() {
    const navigate = useNavigate()

    const params = useParams()
    const nombre = params.nombre ?? ''
    const texto = params.texto ?? ''
    const productosCtx = useProductos()


    //Aplicar useTituloPagina

    return (
        <PlantillaPublica>
            <CatalogoProducto productos={productos} onAdd={carrito.add}></CatalogoProducto>
        </PlantillaPublica>
    );
}

export default Catalogo;