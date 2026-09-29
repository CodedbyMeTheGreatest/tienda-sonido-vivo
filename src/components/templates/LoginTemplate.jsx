function LoginTemplate(props) {
    return (
        <div>
            <header>
                {/*Encabezado*/}
            </header>
            <main>

                {/* props.children renderiza el Organismo pasado como contenido hijo */}
                {props.children}

            </main>
            <footer>
                <p>{props.piePagina}</p>
            </footer>
        </div>
    );
}

export default LoginTemplate;