import { Col, Row } from "react-bootstrap";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import { useProductos } from "../context/ProductContext";
import { useCart } from "../context/CarritoContext";
import TarjetaProducto from "../components/molecules/TarjetaProducto";
import FormularioContacto from "../components/organisms/FormularioContacto";

function Inicio() {
    const { productos } = useProductos();
    const { añadir } = useCart();
    const destacados = productos.slice(0, 4);

    return (
        <PlantillaPublica>
            <Row>
                <Col xs={12}>
                    <section className="banner-principal">
                        <h1>Bienvenido a Sonido Vivo</h1>
                        <p>Encuentra los mejores instrumentos musicales</p>
                    </section>
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <section className="destacados">
                        <h2>Productos Destacados</h2>
                        <div className="grilla-productos">
                            {destacados.map((p) => (
                                <TarjetaProducto
                                    key={p.codigo}
                                    producto={p}
                                    href={`/catalogo/${p.codigo}`}
                                    productoTextAlt={`Imagen de ${p.nombre} ${p.marca} ${p.modelo}`}
                                    productoNombreCompleto={`${p.nombre} ${p.marca} ${p.modelo}`}
                                    onAdd={añadir}
                                />
                            ))}
                        </div>
                    </section>
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <section id="nosotros" className="nosotros">
                        <h2>Nosotros</h2>
                        <p>
                            En Sonido Vivo llevamos años ayudando a músicos de todos los niveles
                            a encontrar el instrumento ideal para su sonido.
                        </p>
                    </section>
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <section id="contactanos" className="contacto">
                        <h2>Contáctanos</h2>
                        <FormularioContacto />
                    </section>
                </Col>
            </Row>
        </PlantillaPublica>
    );
}

export default Inicio;