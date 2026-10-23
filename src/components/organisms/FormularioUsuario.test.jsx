import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormularioUsuario from "./FormularioUsuario";

// Usuario válido para los casos de edición (RUN con dígito verificador correcto)
const usuarioValido = {
    run: "123456785",
    nombres: "Camila",
    apellidos: "Rojas Muñoz",
    correo: "camila.rojas@gmail.com",
    contrasena: "1234",
    region: "Valparaíso",
    comuna: "Viña del Mar",
    direccion: "Av. Libertad 450",
    rol: "Administrador",
};

function dibujarFormulario(usuarioAEditar = null) {
    const onSubmit = vi.fn();
    const onCancelar = vi.fn();
    render(
        <FormularioUsuario
            usuarioAEditar={usuarioAEditar}
            onSubmit={onSubmit}
            onCancelar={onCancelar}
        />
    );
    return { onSubmit, onCancelar };
}

describe("FormularioUsuario", () => {
    describe("modo crear", () => {
        it("muestra el RUN editable y el botón Agregar usuario", () => {
            dibujarFormulario();

            expect(screen.getByLabelText("RUN")).toBeInTheDocument();
            expect(screen.getByRole("button", { name: "Agregar usuario" })).toBeInTheDocument();
        });

        it("no llama a onSubmit y muestra errores si se envía vacío", async () => {
            const { onSubmit } = dibujarFormulario();

            await userEvent.click(screen.getByRole("button", { name: "Agregar usuario" }));

            expect(onSubmit).not.toHaveBeenCalled();
            expect(screen.getByText(/RUN inválido/)).toBeInTheDocument();
        });

        it("muestra los nombres de las regiones y deja la comuna sin opciones hasta elegir región", () => {
            dibujarFormulario();

            expect(screen.getByRole("option", { name: "Valparaíso" })).toBeInTheDocument();
            // sin región elegida no hay comunas disponibles
            expect(screen.queryByRole("option", { name: "Maipú" })).not.toBeInTheDocument();
        });

        it("carga las comunas de la región elegida", async () => {
            dibujarFormulario();

            await userEvent.selectOptions(screen.getByLabelText("Región"), "Región Metropolitana");

            expect(screen.getByRole("option", { name: "Maipú" })).toBeInTheDocument();
        });
    });

    describe("modo editar", () => {
        it("precarga los datos, muestra el RUN como texto y el botón Guardar cambios", () => {
            dibujarFormulario(usuarioValido);

            expect(screen.getByLabelText("Nombres")).toHaveValue("Camila");
            expect(screen.getByLabelText("Correo Electrónico")).toHaveValue("camila.rojas@gmail.com");
            // el RUN se ve como texto, no como campo editable
            expect(screen.getByText("123456785")).toBeInTheDocument();
            expect(screen.queryByRole("textbox", { name: "RUN" })).not.toBeInTheDocument();
            expect(screen.getByRole("button", { name: "Guardar cambios" })).toBeInTheDocument();
        });

        it("llama a onSubmit con los datos, sin confirmarContrasena, cuando todo es válido", async () => {
            const { onSubmit } = dibujarFormulario(usuarioValido);

            await userEvent.click(screen.getByRole("button", { name: "Guardar cambios" }));

            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(onSubmit).toHaveBeenCalledWith(usuarioValido);
        });

        it("avisa cuando la confirmación de contraseña no coincide", async () => {
            dibujarFormulario(usuarioValido);

            await userEvent.type(screen.getByLabelText("Confirmar Contraseña"), "x");

            expect(screen.getByText("Las contraseñas no coinciden.")).toBeInTheDocument();
        });

        it("reinicia la comuna al cambiar la región", async () => {
            dibujarFormulario(usuarioValido);
            expect(screen.getByLabelText("Comuna")).toHaveValue("Viña del Mar");

            await userEvent.selectOptions(screen.getByLabelText("Región"), "Región Metropolitana");

            expect(screen.getByLabelText("Comuna")).toHaveValue("");
        });
    });

    describe("botón Cancelar", () => {
        it("llama a onCancelar sin enviar el formulario", async () => {
            const { onSubmit, onCancelar } = dibujarFormulario();

            await userEvent.click(screen.getByRole("button", { name: "Cancelar" }));

            expect(onCancelar).toHaveBeenCalledTimes(1);
            expect(onSubmit).not.toHaveBeenCalled();
        });
    });
});