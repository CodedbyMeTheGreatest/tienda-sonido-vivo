import TarjetaProducto from "../molecules/TarjetaProducto";
import imagen from "../../assets/placeholder.png"

function CatalogoProducto(props) {

    return (
        <section className="catalogo">
            <h2>Catálogo</h2>
            <div className="grilla-productos">
                {props.productos.map((p) => (
                    <TarjetaProducto
                        key={p.codigo}
                        producto={p}
                        href={`${import.meta.env.BASE_URL}producto/${p.codigo}`}
                        productoImagenRuta={imagen}
                        productoTextAlt={`Imagen de ${p.nombre} ${p.marca} ${p.modelo}`}
                        productoNombreCompleto={`${p.nombre} ${p.marca} ${p.modelo}`}
                        onAdd={props.onAdd}
                    >
                    </TarjetaProducto>
                ))}
            </div>
        </section>
    );
};

export default CatalogoProducto;