import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import DetalleProducto from "../components/organisms/DetalleProducto";
import { useCart } from "../context/CarritoContext";
import { obtenerProducto } from "../services/productoService";
import { useTituloPagina } from "../hooks/useTituloPagina";

function Producto() {
    const params = useParams();
    const codigo = params.codigo;
    const producto = obtenerProducto(codigo);
    const nombreCompleto = producto
        ? `${producto.nombre} ${producto.marca || ""} ${producto.modelo || ""}`.trim()
        : "Producto no encontrado";

    useTituloPagina(nombreCompleto);

    const { añadir } = useCart();
    const [cantidad, setCantidad] = useState(1);

    if (!producto) {
        return (
            <PlantillaPublica>
                <div className="text-center my-5 py-5">
                    <h2>{nombreCompleto}</h2>
                    <p>El código "{codigo}" no corresponde a ningún producto de nuestro catálogo.</p>
                    <Link to="/catalogo" className="btn btn-primary mt-3">
                        Volver al catálogo
                    </Link>
                </div>
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
                imagenUrl={producto.imagenUrl || producto.imagen}
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