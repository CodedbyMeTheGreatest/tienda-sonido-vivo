import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import TarjetaProducto from "../molecules/TarjetaProducto";
import Boton from "../atoms/Boton";
import { useProductos } from "../../context/ProductContext";
import { categoriasDe } from "../../utils/categorias";
import imagen from "../../assets/placeholder.png";

function CatalogoProducto(props) {
    const navigate = useNavigate();
    const params = useParams();

    const { productos: todosLosProductos } = useProductos();
    const listaCategorias = categoriasDe(todosLosProductos);

    const [textoBusqueda, setTextoBusqueda] = useState(params.texto || "");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(params.nombre || "");

    useEffect(() => {
        setTextoBusqueda(params.texto || "");
        setCategoriaSeleccionada(params.nombre || "");
    }, [params.texto, params.nombre]);

    const ejecutarBusqueda = (e) => {
        e.preventDefault();
        const textoLimpio = textoBusqueda.trim();
        if (textoLimpio) {
            navigate(`/buscar/${encodeURIComponent(textoLimpio)}`);
        } else {
            navigate("/catalogo");
        }
    };

    const cambiarCategoria = (e) => {
        const nuevaCategoria = e.target.value;
        setCategoriaSeleccionada(nuevaCategoria);
        if (nuevaCategoria) {
            navigate(`/categoria/${encodeURIComponent(nuevaCategoria)}`);
        } else {
            navigate("/catalogo");
        }
    };

    return (
        <section className="catalogo">
            <h2>Catálogo</h2>

            <Form onSubmit={ejecutarBusqueda} className="my-4">
                <Row className="g-3 align-items-center">
                    <Col xs={12} lg={6}>
                        <Form.Control
                            type="search"
                            placeholder="¿Qué estás buscando? (ej: Fender, Yamaha...)"
                            value={textoBusqueda}
                            onChange={(e) => setTextoBusqueda(e.target.value)}
                        />
                    </Col>

                    <Col xs={12} lg={4}>
                        <Form.Select
                            value={categoriaSeleccionada}
                            onChange={cambiarCategoria}
                        >
                            <option value="">Todas las categorías</option>
                            {listaCategorias.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>

                    <Col xs={12} lg={2} className="text-center text-lg-end">
                        <Boton
                            tipo="submit"
                            texto="Buscar"
                            className="boton-buscar-catalogo"
                        />
                    </Col>
                </Row>
            </Form>

            <div className="grilla-productos">
                {props.productos.length > 0 ? (
                    props.productos.map((p) => (
                        <TarjetaProducto
                            key={p.codigo}
                            producto={p}
                            to={`/producto/${p.codigo}`}
                            productoImagenRuta={imagen}
                            productoTextAlt={`Imagen de ${p.nombre} ${p.marca} ${p.modelo}`}
                            productoNombreCompleto={`${p.nombre} ${p.marca} ${p.modelo}`}
                            onAdd={props.onAdd}
                        />
                    ))
                ) : (
                    <p className="mensaje-vacio">
                        No se encontraron productos que coincidan con la búsqueda.
                    </p>
                )}
            </div>
        </section>
    );
}

export default CatalogoProducto;