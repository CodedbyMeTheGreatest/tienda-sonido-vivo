import TarjetaProducto from "../molecules/TarjetaProducto";

function CatalogoProducto(props) {
    return (
        <section className="catalogo">
            <h2>Catálogo</h2>
            <div className="grilla-productos">
                {props.dataProductos.map((p) => (
                    <TarjetaProducto 
                        href={`detalle-producto.html?codigo=${p.codigo}`}
                        productoImagenRuta=""
                        productoTextAlt={`Imagen de ${p.nombre} ${p.marca} ${p.modelo}`}
                        productoNombreCompleto={`${p.nombre} ${p.marca} ${p.modelo}`}
                        productoPrecio={p.precio}
                        productoCodigo={p.codigo}>
                    </TarjetaProducto>
                ))}
            </div>
        </section>
    );
};

export default CatalogoProducto;