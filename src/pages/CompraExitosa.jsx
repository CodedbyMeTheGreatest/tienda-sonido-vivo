import { Link, Navigate, useParams } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import ResumenCompra from "../components/organisms/ResumenCompra";
import { usePedidos } from "../context/PedidoContext";
import { useSesion } from "../context/SesionContext";
import { useTituloPagina } from "../hooks/useTituloPagina";
import AnimacionExito from "../components/molecules/AnimacionExito";

export default function CompraExitosa() {
    const { id } = useParams();
    const { pedidos } = usePedidos();
    const { usuario } = useSesion();
    const pedido = pedidos.find((p) => p.id === id && p.clienteRun === usuario?.run);

    useTituloPagina("Compra exitosa");

    if (!pedido) return <Navigate to="/mis-pedidos" replace />;

    return (
        <PlantillaPublica>
            <section className="resultado-compra">
                <AnimacionExito />
                <h2>¡Compra exitosa!</h2>
                <p>Tu pedido <strong>{pedido.id}</strong> está {pedido.estado.toLowerCase()}.</p>
                <p>
                    Entrega: {pedido.entrega.tipo}
                    {pedido.entrega.direccion && ` — ${pedido.entrega.direccion}`}
                </p>
                <ResumenCompra lineas={pedido.items} total={pedido.total} />
                <div className="resultado-compra-acciones">
                    <Link to="/mis-pedidos" className="boton-carrito boton-carrito-primario">Ver mis pedidos</Link>
                    <Link to="/catalogo" className="boton-carrito boton-carrito-secundario">Seguir comprando</Link>
                </div>
            </section>
        </PlantillaPublica>
    );
}