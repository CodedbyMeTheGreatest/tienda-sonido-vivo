import { useParams } from 'react-router-dom'
import productos from "../data/Productos.json"
import { useTituloPagina } from "../hooks/useTituloPagina"
import CatalogoProducto from "../components/organisms/CatalogoProducto";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import { useCart } from '../context/CarritoContext';

function Catalogo() {


    const params = useParams()
    const nombre = params.nombre ?? ''
    const texto = params.texto ?? ''
    //const productosCtx = useProductos()
    //filtrar productos

    const carrito = useCart()



    let titulo = 'Catálogo'
    if (nombre) titulo = nombre
    if (texto) titulo = `Resultados para "${texto}"`
    useTituloPagina(titulo)

    return (
        <PlantillaPublica>
            <h2>{titulo}</h2>
            <CatalogoProducto productos={productos} onAdd={carrito.añadir}></CatalogoProducto>
        </PlantillaPublica>
    );
}

export default Catalogo;