import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormularioContacto from "./FormularioContacto";


async function llenarFormularioValido() {
    await userEvent.type(screen.getByLabelText("Nombre Completo"), "Camila Rojas");
    await userEvent.type(screen.getByLabelText("Correo Electrónico"), "camila.rojas@gmail.com");
    await userEvent.type(screen.getByLabelText("Teléfono"), "912345678");
    await userEvent.selectOptions(screen.getByLabelText("Motivo de la consulta"), "Reclamo");
    await userEvent.type(screen.getByLabelText("Mensaje"), "Quisiera consultar por una guitarra.");
}

describe("FormularioContacto", () => {
    describe("estructura", () => {
        it("muestra los 5 campos y el botón de enviar", () => {
            render(<FormularioContacto />);

            expect(screen.getByLabelText("Nombre Completo")).toBeInTheDocument();
            expect(screen.getByLabelText("Correo Electrónico")).toBeInTheDocument();
            expect(screen.getByLabelText("Teléfono")).toBeInTheDocument();
            expect(screen.getByLabelText("Motivo de la consulta")).toBeInTheDocument();
            expect(screen.getByLabelText("Mensaje")).toBeInTheDocument();
            expect(screen.getByRole("button", { name: "Enviar consulta" })).toBeInTheDocument();
        });

        it("ofrece los 4 motivos de consulta", () => {
            render(<FormularioContacto />);

            ["Consulta general", "Compra especial", "Reclamo", "Otro"].forEach((motivo) => {
                expect(screen.getByRole("option", { name: motivo })).toBeInTheDocument();
            });
        });
    });

    describe("validación en vivo", () => {
        it("marca el nombre como inválido con 1 carácter y lo corrige con 2", async () => {
            render(<FormularioContacto />);
            const nombre = screen.getByLabelText("Nombre Completo");

            await userEvent.type(nombre, "C");
            expect(screen.getByText("Ingrese un nombre válido (2 a 50 caracteres).")).toBeInTheDocument();

            await userEvent.type(nombre, "a");
            expect(screen.queryByText("Ingrese un nombre válido (2 a 50 caracteres).")).not.toBeInTheDocument();
        });

        it("rechaza un correo de un dominio no permitido", async () => {
            render(<FormularioContacto />);

            await userEvent.type(screen.getByLabelText("Correo Electrónico"), "camila@hotmail.com");

            expect(screen.getByText(/Solo se aceptan @duoc.cl/)).toBeInTheDocument();
        });

        it("acepta un correo @gmail.com", async () => {
            render(<FormularioContacto />);

            await userEvent.type(screen.getByLabelText("Correo Electrónico"), "camila@gmail.com");

            expect(screen.queryByText(/Solo se aceptan @duoc.cl/)).not.toBeInTheDocument();
        });

        it("rechaza un teléfono con letras", async () => {
            render(<FormularioContacto />);

            await userEvent.type(screen.getByLabelText("Teléfono"), "abc");

            expect(screen.getByText("Ingrese un teléfono válido.")).toBeInTheDocument();
        });

        it("exige al menos 10 caracteres en el mensaje", async () => {
            render(<FormularioContacto />);

            await userEvent.type(screen.getByLabelText("Mensaje"), "Hola");

            expect(screen.getByText("El mensaje debe tener entre 10 y 500 caracteres.")).toBeInTheDocument();
        });
    });

    describe("envío", () => {
        it("muestra los errores y no confirma el envío si el formulario está vacío", async () => {
            render(<FormularioContacto />);

            await userEvent.click(screen.getByRole("button", { name: "Enviar consulta" }));

            expect(screen.getByText("Ingrese su teléfono.")).toBeInTheDocument();
            expect(screen.getByText("Seleccione un motivo.")).toBeInTheDocument();
            expect(screen.queryByText("¡Gracias! Tu consulta fue enviada.")).not.toBeInTheDocument();
        });

        it("confirma el envío y limpia los campos cuando todo es válido", async () => {
            render(<FormularioContacto />);

            await llenarFormularioValido();
            await userEvent.click(screen.getByRole("button", { name: "Enviar consulta" }));

            expect(screen.getByText("¡Gracias! Tu consulta fue enviada.")).toBeInTheDocument();
            expect(screen.getByLabelText("Nombre Completo")).toHaveValue("");
            expect(screen.getByLabelText("Mensaje")).toHaveValue("");
        });
    });
});