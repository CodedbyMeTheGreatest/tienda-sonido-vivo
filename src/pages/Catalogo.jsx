import { useParams } from 'react-router-dom'
import { useTituloPagina } from "../hooks/useTituloPagina"
import CatalogoProducto from "../components/organisms/CatalogoProducto";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import { useCart } from '../context/CarritoContext';
import { useProductos } from "../context/ProductContext";
import { filtrarProductos } from '../utils/filtrarProductos';

function Catalogo() {
    const { productos } = useProductos();
    const carrito = useCart()

    const params = useParams()
    const nombre = params.nombre ?? ''
    const texto = params.texto ?? ''

    const productosVisibles = filtrarProductos(productos, { texto, categoria: nombre });

    let titulo = 'Catálogo'
    if (nombre) titulo = `Categoría: ${nombre}`;
    if (texto) titulo = `Resultados para "${texto}"`
    useTituloPagina(titulo)

    return (
        <PlantillaPublica>
            <CatalogoProducto titulo={titulo} productos={productosVisibles} onAdd={carrito.añadir}></CatalogoProducto>
        </PlantillaPublica>
    );
}

export default Catalogo;