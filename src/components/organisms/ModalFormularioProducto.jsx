import { Modal } from "react-bootstrap";
import FormularioProducto from "./FormularioProducto";

function ModalFormularioProducto(props) {
    const show = props.show
    const onHide = props.onHide
    const productoAEditar = props.productoAEditar
    const onSubmit = props.onSubmit
    const errorGlobal = props.errorGlobal
    return (
        <Modal show={show} onHide={onHide} centered size="lg" className="modal-producto">
            <Modal.Header closeButton>
                <Modal.Title>
                    {productoAEditar ? "Editar Producto" : "Nuevo Producto"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorGlobal && <div className="mensaje-error-global">{errorGlobal}</div>}
                <FormularioProducto
                    productoAEditar={productoAEditar}
                    onSubmit={onSubmit}
                    onCancelar={onHide}
                />
            </Modal.Body>
        </Modal>
    );
}

export default ModalFormularioProducto;