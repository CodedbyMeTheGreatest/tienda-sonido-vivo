import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalFormularioUsuario from "./ModalFormularioUsuario";


vi.mock("./FormularioUsuario", () => ({
    default: (props) => (
        <div>
            <p>{props.usuarioAEditar ? `editando ${props.usuarioAEditar.run}` : "formulario vacío"}</p>
            <button onClick={() => props.onSubmit({ run: "123456785" })}>enviar-falso</button>
            <button onClick={props.onCancelar}>cancelar-falso</button>
        </div>
    ),
}));


function dibujarModal(cambios) {
    const props = {
        show: true,
        onHide: vi.fn(),
        usuarioAEditar: null,
        onSubmit: vi.fn(),
        errorGlobal: "",
        ...cambios,
    };
    render(<ModalFormularioUsuario {...props} />);
    return props;
}

describe("ModalFormularioUsuario", () => {
    describe("visibilidad y título", () => {
        it("no muestra nada cuando show es false", () => {
            dibujarModal({ show: false });

            expect(screen.queryByText("Nuevo Usuario")).not.toBeInTheDocument();
            expect(screen.queryByText("formulario vacío")).not.toBeInTheDocument();
        });

        it("muestra el título Nuevo Usuario y el formulario vacío al crear", () => {
            dibujarModal({ usuarioAEditar: null });

            expect(screen.getByText("Nuevo Usuario")).toBeInTheDocument();
            expect(screen.getByText("formulario vacío")).toBeInTheDocument();
        });

        it("muestra el título Editar Usuario y le pasa el usuario al formulario", () => {
            dibujarModal({ usuarioAEditar: { run: "123456785", nombres: "Camila" } });

            expect(screen.getByText("Editar Usuario")).toBeInTheDocument();
            expect(screen.getByText("editando 123456785")).toBeInTheDocument();
        });
    });

    describe("mensaje de error global", () => {
        it("muestra el error cuando errorGlobal tiene texto", () => {
            dibujarModal({ errorGlobal: "El RUN ya existe" });

            expect(screen.getByText("El RUN ya existe")).toBeInTheDocument();
        });

        it("no muestra ningún aviso cuando errorGlobal está vacío", () => {
            const { container } = render(
                <ModalFormularioUsuario show={true} onHide={vi.fn()} usuarioAEditar={null} onSubmit={vi.fn()} errorGlobal="" />
            );

            
            expect(document.body.querySelector(".mensaje-error-global")).toBeNull();
            expect(container).toBeEmptyDOMElement();
        });
    });

    describe("eventos", () => {
        it("llama a onSubmit con los datos cuando el formulario envía", async () => {
            const props = dibujarModal();

            await userEvent.click(screen.getByText("enviar-falso"));

            expect(props.onSubmit).toHaveBeenCalledTimes(1);
            expect(props.onSubmit).toHaveBeenCalledWith({ run: "123456785" });
        });

        it("llama a onHide cuando el formulario cancela", async () => {
            const props = dibujarModal();

            await userEvent.click(screen.getByText("cancelar-falso"));

            expect(props.onHide).toHaveBeenCalledTimes(1);
        });

        it("llama a onHide al presionar la X del encabezado", async () => {
            const props = dibujarModal();

            await userEvent.click(screen.getByRole("button", { name: /close/i }));

            expect(props.onHide).toHaveBeenCalledTimes(1);
        });
    });
});