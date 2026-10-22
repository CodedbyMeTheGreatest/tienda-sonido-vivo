import { useParams } from 'react-router-dom'
import { useTituloPagina } from "../hooks/useTituloPagina"
import CatalogoProducto from "../components/organisms/CatalogoProducto";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import { useCart } from '../context/CarritoContext';
import { useProductos } from "../context/ProductContext";

function Catalogo() {
    const { productos } = useProductos();

    const params = useParams()
    const nombre = params.nombre ?? ''
    const texto = params.texto ?? ''

    const carrito = useCart()

    let titulo = 'Catálogo'
    if (nombre) titulo = nombre
    if (texto) titulo = `Resultados para "${texto}"`
    useTituloPagina(titulo)

    return (
        <PlantillaPublica>
            <CatalogoProducto productos={productos} onAdd={carrito.añadir}></CatalogoProducto>
        </PlantillaPublica>
    );
}

export default Catalogo;