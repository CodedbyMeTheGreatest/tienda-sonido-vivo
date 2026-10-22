import { Modal } from "react-bootstrap";
import Boton from "../atoms/Boton";

function ModalConfirmacionUsuario(props) {
    const usuario = props.usuario; 

    return (
        <Modal show={props.show} onHide={props.onHide} centered className="modal-confirmacion">
            <Modal.Header closeButton>
                <Modal.Title>Eliminar usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {usuario && (
                    <p>
                        ¿Seguro que deseas eliminar a <strong>{usuario.nombres} {usuario.apellidos}</strong> (RUN {usuario.run})?
                        Esta acción no se puede deshacer.
                    </p>
                )}
            </Modal.Body>
            <div className="acciones-modal">
                <Boton className="btn-cancelar" alHacerClick={props.onHide} texto="Cancelar" />
                <Boton className="btn-confirmar-eliminar" alHacerClick={props.onConfirmar} texto="Eliminar" />
            </div>
        </Modal>
    );
}

export default ModalConfirmacionUsuario;