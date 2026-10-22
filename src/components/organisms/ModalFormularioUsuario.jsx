import { Modal } from "react-bootstrap";
import FormularioUsuario from "./FormularioUsuario";

function ModalFormularioUsuario(props) {
    const show = props.show;
    const onHide = props.onHide;
    const usuarioAEditar = props.usuarioAEditar;
    const onSubmit = props.onSubmit;
    const errorGlobal = props.errorGlobal;

    return (
        <Modal show={show} onHide={onHide} centered scrollable size="lg" className="modal-usuario">
            <Modal.Header closeButton>
                <Modal.Title>
                    {usuarioAEditar ? "Editar Usuario" : "Nuevo Usuario"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorGlobal && <div className="mensaje-error-global">{errorGlobal}</div>}
                <FormularioUsuario
                    usuarioAEditar={usuarioAEditar}
                    onSubmit={onSubmit}
                    onCancelar={onHide}
                />
            </Modal.Body>
        </Modal>
    );
}

export default ModalFormularioUsuario;