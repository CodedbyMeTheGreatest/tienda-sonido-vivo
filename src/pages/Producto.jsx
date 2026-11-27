import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import DetalleProducto from "../components/organisms/DetalleProducto";
import { useCart } from "../context/CarritoContext";
import { useProductos } from "../context/ProductContext";
import { useTituloPagina } from "../hooks/useTituloPagina";
import imagen from "../assets/placeholder.png"
import { Alert } from "react-bootstrap";


function Producto() {
    const { codigo } = useParams();
    const { productos, cargando, error } = useProductos();
    const producto = productos.find((p) => p.codigo === codigo);
    const nombreCompleto = producto
        ? `${producto.nombre} ${producto.marca || ""} ${producto.modelo || ""}`.trim()
        : "Producto no encontrado";

    useTituloPagina(nombreCompleto);

    const { añadir } = useCart();
    const [cantidad, setCantidad] = useState(1);

    if (cargando) {
    return (
        <PlantillaPublica>
            <p className="text-center my-5">Cargando producto...</p>
        </PlantillaPublica>
    );
}

    if (!producto) {
        return (
            <PlantillaPublica>
                {error && <Alert variant="danger">{error}</Alert>}
                {cargando
                    ? <p className="text-center my-5">Cargando catálogo...</p>
                    : <CatalogoProducto titulo={titulo} productos={productosVisibles} onAdd={carrito.añadir} />}
            </PlantillaPublica>
        );
    }

    const itemsBreadcrumb = [
        { texto: "Catálogo", url: "/catalogo" },
        { texto: producto.categoria || "Instrumentos", url: "/catalogo" },
        { texto: producto.nombre, url: "#" }
    ];

    return (
        <PlantillaPublica>
            <DetalleProducto
                imagenUrl={imagen}
                nombre={nombreCompleto}
                descripcion={producto.descripcion}
                precio={producto.precio}
                codigo={producto.codigo}
                stock={producto.stock}
                cantidad={cantidad}
                itemsBreadcrumb={itemsBreadcrumb}
                onIncrement={() => setCantidad((prev) => Math.min(prev + 1, producto.stock))}
                onDecrement={() => setCantidad((prev) => Math.max(prev - 1, 1))}
                onAdd={() => añadir(producto, cantidad)}
            />
        </PlantillaPublica>
    );
}

export default Producto;