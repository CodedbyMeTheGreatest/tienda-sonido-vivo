import { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";
import { esCampoVacio, esTextoValido, esNumeroValido } from "../../utils/validaciones";
import { categoriasDe } from "../../utils/categorias";
import { useProductos } from "../../context/ProductContext";
import { listarMarcasApi, listarModelosApi } from "../../services/productoApiService";

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

    const [marcas, setMarcas] = useState([]);
    const [modelos, setModelos] = useState([]);

    useEffect(() => {
        listarMarcasApi().then(setMarcas).catch(() => setMarcas([]));
    }, []);

    const marcaElegida = marcas.find((m) => m.nombre === formData.marca);
    const marcaElegidaId = marcaElegida?.id;

    useEffect(() => {
        if (!marcaElegidaId) { setModelos([]); return; }
        listarModelosApi(marcaElegidaId).then(setModelos).catch(() => setModelos([]));
    }, [marcaElegidaId]);

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
        setFormData((prev) => ({
            ...prev, [campo]: valor, ...(campo === "marca" ? { modelo: "" } : {})
        }));
    };

    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!esModoEdicion && esCampoVacio(formData.codigo)) {
            nuevosErrores.codigo = "El código es obligatorio.";
        }

        if (!esTextoValido(formData.nombre, 1, 100)) {
            nuevosErrores.nombre = "El nombre debe tener entre 1 y 100 caracteres.";
        }

        if(!esTextoValido(formData.descripcion, 1, 500)) {
            nuevosErrores.descripcion = "La descripción debe tener entre 1 y 500 caracteres"
        }

        if (esCampoVacio(formData.categoria)) {
            nuevosErrores.categoria = "Debe seleccionar una categoría.";
        }

        if (!esNumeroValido(formData.precio, 1)) {
            nuevosErrores.precio = "El precio debe ser un número mayor a 0.";
        }

        if (!esNumeroValido(formData.stock, 0)) {
            nuevosErrores.stock = "El stock debe igual o mayor a 0.";
        }

        if (!marcaElegida) nuevosErrores.marca = "Debe seleccionar una marca.";
        if (!modelos.some((m) => m.nombre === formData.modelo)) nuevosErrores.modelo = "Debe seleccionar un modelo.";

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        const modeloElegido = modelos.find((m) => m.nombre === formData.modelo);
        props.onSubmit({
            ...formData,
            precio: Number(formData.precio),
            stock: Number(formData.stock),
            marcaId: marcaElegida?.id,
            modeloId: modeloElegido?.id
        });
    };

    return (
        <Form onSubmit={handleSubmit} className="formulario-producto-admin">
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
                    <CampoFormulario id="marca" etiqueta="Marca" valor={formData.marca}
                        alCambiar={(e) => handleChange("marca", e.target.value)}
                        opciones={marcas.map((m) => m.nombre)} placeholder="Seleccione una marca"
                        esInvalido={Boolean(errores.marca)} mensajeError={errores.marca}
                    />
                </Col>

                <Col xs={12} md={6}>
                        <CampoFormulario id="modelo" etiqueta="Modelo" valor={formData.modelo}
                            alCambiar={(e) => handleChange("modelo", e.target.value)}
                            opciones={modelos.map((m) => m.nombre)}
                            placeholder={marcaElegida ? "Seleccione un modelo" : "Primero elija una marca"}
                            esInvalido={Boolean(errores.modelo)} mensajeError={errores.modelo}
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
            <div className="formulario-acciones">
                {props.onCancelar && (
                    <Boton
                        className="btn-cancelar"
                        alHacerClick={props.onCancelar}
                        texto="Cancelar"
                    />
                )}
                <Boton
                    tipo="submit"
                    className="btn-guardar"
                    texto={esModoEdicion ? "Actualizar Producto" : "Guardar Producto"}
                />
            </div>
        </Form>
    );

}

export default FormularioProducto;