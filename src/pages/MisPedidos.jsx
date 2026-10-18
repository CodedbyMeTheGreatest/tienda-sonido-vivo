import PlantillaPublica from "../components/templates/PlantillaPublica";
import ListaPedidos from "../components/organisms/ListaPedidos";
import { usePedidos } from "../context/PedidoContext";
import { useSesion } from "../context/SesionContext";
import { useTituloPagina } from "../hooks/useTituloPagina";
import AvisoInicioSesion from "../components/molecules/AvisoInicioSesion";

export default function MisPedidos() {
    const { pedidos } = usePedidos();
    const { usuario } = useSesion();

    useTituloPagina("Mis pedidos");

    if(!usuario) {
        return (
        <PlantillaPublica>
            <AvisoInicioSesion titulo="Mis pedidos" mensaje="Inicia sesión para ver tus pedidos." />
        </PlantillaPublica>
        );
    }

    const propios = pedidos.filter((p) => p.clienteRun === usuario.run).reverse();

    return (
        <PlantillaPublica>
            <section className="mis-pedidos">
                <h2>Mis pedidos</h2>
                <ListaPedidos pedidos={propios} />
            </section>
        </PlantillaPublica>
    );
}