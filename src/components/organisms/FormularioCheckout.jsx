import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";
import { ENTREGAS, ENTREGA_DESPACHO } from "../../utils/pedidos";

function FormularioCheckout(props) {
    const { valores, errores } = props;

    const campo = (id) => ({
        id,
        valor: valores[id],
        alCambiar: props.alCambiar,
        requerido: true,
        esInvalido: Boolean(errores[id]),
        mensajeError: errores[id],
    });

    return (
        <form id="checkout" className="admin-form" onSubmit={props.alEnviar} noValidate>
            <CampoFormulario etiqueta="Forma de entrega" opciones={ENTREGAS} {...campo("tipoEntrega")} />
            {valores.tipoEntrega === ENTREGA_DESPACHO && (
                <CampoFormulario etiqueta="Dirección de despacho" tipo="text" {...campo("direccion")} />
            )}
            <Boton tipo="submit" texto="Confirmar pedido" />
        </form>
    );
}

export default FormularioCheckout;