import { Modal } from "react-bootstrap";
import Boton from "../atoms/Boton";

function ModalConfirmacion(props) {
    const show = props.show
    const onHide = props.onHide
    const codigoProducto = props.codigoProducto
    const onConfirmar = props.onConfirmar
    return (
        <Modal show={show} onHide={onHide} centered size="sm" className="modal-confirmacion">
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que deseas eliminar el producto <strong>{codigoProducto}</strong>?
            </Modal.Body>
            <Modal.Footer className="acciones-modal">
                <Boton
                    className="btn-cancelar"
                    alHacerClick={onHide}
                    texto="Cancelar"
                />
                <Boton
                    className="btn-confirmar-eliminar"
                    alHacerClick={onConfirmar}
                    texto="Sí, eliminar"
                />
            </Modal.Footer>
        </Modal>
    );
}

export default ModalConfirmacion;