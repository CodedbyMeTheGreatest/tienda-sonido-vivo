import TarjetaProducto from "../molecules/TarjetaProducto";

function CatalogoProducto(props) {
 
    return (
        <section className="catalogo">
            <div className="grilla-productos">
                {props.productos.map((p) => (
                    <TarjetaProducto 
                        key={p.codigo}
                        producto={p}
                        href={`detalle-producto.html?codigo=${p.codigo}`}
                        productoImagenRuta={"../../assets/react.svg"}
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