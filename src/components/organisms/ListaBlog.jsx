import TarjetaBlog from "../molecules/TarjetaBlog";

function ListaBlog(props) {
    return (
        <section className="blog-section">
            <h2>Últimas entradas</h2>
            <div className="blog-entries">
                {props.entradas.map((e) => (
                    <TarjetaBlog
                        key={e.id}
                        titulo={e.titulo}
                        resumen={e.resumen}
                        to={`/blog/${e.id}`}
                    />
                ))}
            </div>
        </section>
    );
}

export default ListaBlog;