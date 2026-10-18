import { Link, useNavigate } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import FormularioCheckout from "../components/organisms/FormularioCheckout";
import ResumenCompra from "../components/organisms/ResumenCompra";
import useCheckout from "../hooks/useCheckout";
import { useCart } from "../context/CarritoContext";
import { useSesion } from "../context/SesionContext";
import { usePedidos } from "../context/PedidoContext";
import { useProductos } from "../context/ProductContext";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { ENTREGA_DESPACHO, aLineasPedido } from "../utils/pedidos";
import AvisoInicioSesion from "../components/molecules/AvisoInicioSesion";

export default function Checkout() {
    const navigate = useNavigate();
    const { items, totalPrecio, vaciar } = useCart();
    const { usuario } = useSesion();
    const { crear } = usePedidos();
    const { recargar } = useProductos();

    useTituloPagina("Confirmar pedido");

    function confirmar(valores) {
        let pedido;
        try {
            pedido = crear({
                cliente: usuario,
                items,
                entrega: {
                    tipo: valores.tipoEntrega,
                    direccion: valores.tipoEntrega === ENTREGA_DESPACHO ? valores.direccion.trim() : "",
                },
            });
        } catch (error) {
            navigate("/pago-fallido", { state: { motivo: error.message } });
            return;
        }

        recargar();
        vaciar();
        navigate(`/compra-exitosa/${pedido.id}`);
    }

    const { valores, errores, alCambiar, alEnviar } = useCheckout(usuario?.direccion ?? "", confirmar);

    if (!usuario) {
    return (
        <PlantillaPublica>
            <AvisoInicioSesion titulo="Confirmar pedido" mensaje="Inicia sesión para confirmar tu pedido." />
        </PlantillaPublica>
    );
}

    if (items.length === 0) {
        return (
            <PlantillaPublica>
                <section className="resultado-compra">
                    <h2>Confirmar pedido</h2>
                    <p>Tu carrito está vacío.</p>
                    <Link to="/catalogo" className="boton-carrito boton-carrito-primario">Ir al catálogo</Link>
                </section>
            </PlantillaPublica>
        );
    }

    return (
        <PlantillaPublica>
            <section className="checkout">
                <h2>Confirmar pedido</h2>
                <div className="checkout-grilla">
                    <FormularioCheckout valores={valores} errores={errores} alCambiar={alCambiar} alEnviar={alEnviar} />
                    <ResumenCompra lineas={aLineasPedido(items)} total={totalPrecio} />
                </div>
            </section>
        </PlantillaPublica>
    );
}