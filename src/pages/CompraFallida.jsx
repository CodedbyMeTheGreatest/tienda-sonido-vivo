import { Link, useLocation } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import { useTituloPagina } from "../hooks/useTituloPagina";

export default function PagoFallido() {
    const { state } = useLocation();

    useTituloPagina("Pago fallido");

    return (
        <PlantillaPublica>
            <section className="resultado-compra">
                <h2>No pudimos confirmar tu pedido</h2>
                <p className="mensaje-error">
                    {state?.motivo ?? "Ocurrió un problema al confirmar tu pedido."}
                </p>
                <p>Tu carrito sigue intacto, puedes revisarlo e intentarlo de nuevo.</p>
                <div className="resultado-compra-acciones">
                    <Link to="/carrito" className="boton-carrito boton-carrito-primario">Volver al carrito</Link>
                </div>
            </section>
        </PlantillaPublica>
    );
}