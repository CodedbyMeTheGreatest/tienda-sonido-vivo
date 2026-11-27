import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";
import { esNumeroValido } from "../../utils/validaciones";

function ModalStockProducto(props) {
    const { show, producto, onHide, onGuardar, errorGlobal } = props;
    const [stock, setStock] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setStock(producto ? String(producto.stock) : "");
        setError("");
    }, [producto]);

    const enviar = (e) => {
        e.preventDefault();
        if (!esNumeroValido(stock, 0)) {
            setError("El stock debe ser un número igual o mayor a 0.");
            return;
        }
        onGuardar(Number(stock));
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Actualizar stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {producto && <p><strong>{producto.nombre}</strong> ({producto.codigo})</p>}
                {errorGlobal && <div className="mensaje-error-global">{errorGlobal}</div>}
                <form onSubmit={enviar} noValidate>
                    <CampoFormulario
                        id="stock" etiqueta="Stock disponible" tipo="number" valor={stock}
                        alCambiar={(e) => setStock(e.target.value)}
                        esInvalido={Boolean(error)} mensajeError={error}
                    />
                    <div className="formulario-acciones">
                        <Boton tipo="button" className="btn-cancelar" alHacerClick={onHide} texto="Cancelar" />
                        <Boton tipo="submit" className="btn-guardar" texto="Guardar stock" />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalStockProducto;