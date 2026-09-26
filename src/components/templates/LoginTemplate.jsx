function LoginTemplate(props) {
    return (
        <div>
            <main>
                {props.titulo && (
                    <header>
                        <h2>{props.titulo}</h2>
                    </header>
                )}
                
                {/* props.children renderiza el Organismo pasado como contenido hijo */}
                {props.children}

                {props.piePagina && (
                    <footer>
                        <p>{props.piePagina}</p>
                    </footer>
                )}
            </main>
        </div>
    );
}

export default LoginTemplate;