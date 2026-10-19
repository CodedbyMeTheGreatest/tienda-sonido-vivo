import { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";
import { esCampoVacio, esTextoValido, esNumeroValido } from "../../utils/validaciones";
import { categoriasDe } from "../../utils/categorias";
import { useProductos } from "../../context/ProductContext";

function FormularioProducto(props) {
    const productoAEditar = props.productoAEditar;
    const esModoEdicion = Boolean(productoAEditar)
    const { productos } = useProductos();

    const listaCategorias = categoriasDe(productos)

    const [formData, setFormData] = useState({
        codigo: "",
        nombre: "",
        marca: "",
        modelo: "",
        categoria: "",
        precio: "",
        stock: "",
        descripcion: ""
    });

    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (productoAEditar) {
            setFormData({
                codigo: productoAEditar.codigo || "",
                nombre: productoAEditar.nombre || "",
                marca: productoAEditar.marca || "",
                modelo: productoAEditar.modelo || "",
                categoria: productoAEditar.categoria || "",
                precio: productoAEditar.precio ?? "",
                stock: productoAEditar.stock ?? "",
                descripcion: productoAEditar.descripcion || ""
            });
        } else {
            setFormData({
                codigo: "",
                nombre: "",
                marca: "",
                modelo: "",
                categoria: "",
                precio: "",
                stock: "",
                descripcion: ""
            });
        }
        setErrores({});
    }, [productoAEditar]);

    const handleChange = (campo, valor) => {
        setFormData((prev) => ({ ...prev, [campo]: valor }));
        if (errores[campo]) {
            setErrores((prev) => ({ ...prev, [campo]: null }));
        }
    };

    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!esModoEdicion && esCampoVacio(formData.codigo)) {
            nuevosErrores.codigo = "El código es obligatorio.";
        }

        if (!esTextoValido(formData.nombre, 2, 80)) {
            nuevosErrores.nombre = "El nombre debe tener entre 2 y 80 caracteres.";
        }

        if (esCampoVacio(formData.categoria)) {
            nuevosErrores.categoria = "Debe seleccionar una categoría.";
        }

        if (!esNumeroValido(formData.precio, 1)) {
            nuevosErrores.precio = "El precio debe ser un número mayor a 0.";
        }

        if (!esNumeroValido(formData.stock, 0)) {
            nuevosErrores.stock = "El stock debe ser 0 o mayor.";
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        const productoFinal = {
            ...formData,
            precio: Number(formData.precio),
            stock: Number(formData.stock)
        };
        props.onSubmit(productoFinal);
    };

    return (
        <Form onSubmit={handleSubmit} className="">
            <h3 className="">{esModoEdicion ? "Editar Producto" : "Agregar Producto Nuevo"}</h3>
            <Row>
                <Col xs={12} md={6}>
                    <CampoFormulario
                        id="codigo"
                        etiqueta="Código de Producto"
                        valor={formData.codigo}
                        alCambiar={(e) => handleChange("codigo", e.target.value)}
                        esInvalido={Boolean(errores.codigo)}
                        mensajeError={errores.codigo}
                        deshabilitado={esModoEdicion}
                    />
                </Col>

                <Col xs={12} md={6}>
                    <CampoFormulario
                        id="categoria"
                        etiqueta="Categoría"
                        valor={formData.categoria}
                        alCambiar={(e) => handleChange("categoria", e.target.value)}
                        opciones={listaCategorias}
                        placeholder="Seleccione una categoría"
                        esInvalido={Boolean(errores.categoria)}
                        mensajeError={errores.categoria}
                    />
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <CampoFormulario
                        id="nombre"
                        etiqueta="Nombre del Producto"
                        valor={formData.nombre}
                        alCambiar={(e) => handleChange("nombre", e.target.value)}
                        esInvalido={Boolean(errores.nombre)}
                        mensajeError={errores.nombre}
                    />
                </Col>
            </Row>

            <Row>
                <Col xs={12} md={6}>
                    <CampoFormulario
                        id="marca"
                        etiqueta="Marca"
                        valor={formData.marca}
                        alCambiar={(e) => handleChange("marca", e.target.value)}
                    />
                </Col>

                <Col xs={12} md={6}>
                    <CampoFormulario
                        id="modelo"
                        etiqueta="Modelo"
                        valor={formData.modelo}
                        alCambiar={(e) => handleChange("modelo", e.target.value)}
                    />
                </Col>
            </Row>

            <Row>
                <Col xs={12} md={6}>
                    <CampoFormulario
                        id="precio"
                        etiqueta="Precio ($)"
                        tipo="number"
                        valor={formData.precio}
                        alCambiar={(e) => handleChange("precio", e.target.value)}
                        esInvalido={Boolean(errores.precio)}
                        mensajeError={errores.precio}
                    />
                </Col>

                <Col xs={12} md={6}>
                    <CampoFormulario
                        id="stock"
                        etiqueta="Stock Disponible"
                        tipo="number"
                        valor={formData.stock}
                        alCambiar={(e) => handleChange("stock", e.target.value)}
                        esInvalido={Boolean(errores.stock)}
                        mensajeError={errores.stock}
                    />
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <CampoFormulario
                        id="descripcion"
                        etiqueta="Descripción"
                        tipo="textarea"
                        valor={formData.descripcion}
                        alCambiar={(e) => handleChange("descripcion", e.target.value)}
                    />
                </Col>
            </Row>
            <div className="">
                {props.onCancelar && (
                    <Boton
                        className="btn btn-secondary"
                        alHacerClick={props.onCancelar}
                        texto="Cancelar"
                    />
                )}
                <Boton
                    tipo="submit"
                    className="btn btn-danger"
                    texto={esModoEdicion ? "Actualizar Producto" : "Guardar Producto"}
                />
            </div>
        </Form>
    );

}

export default FormularioProducto;