import { ESTADOS_PEDIDO } from "../../utils/pedidos";

function EstadoPedido(props) {
    const indice = ESTADOS_PEDIDO.indexOf(props.estado);

    return (
        <ol className="estado-pedido" aria-label={`Estado: ${props.estado}`}>
            {ESTADOS_PEDIDO.map((estado, i) => (
                <li key={estado} className={i <= indice ? "estado-paso estado-paso-activo" : "estado-paso"}>
                    {estado}
                </li>
            ))}
        </ol>
    );
}

export default EstadoPedido;