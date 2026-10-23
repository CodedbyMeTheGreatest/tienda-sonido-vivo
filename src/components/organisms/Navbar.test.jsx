import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";


const mocks = vi.hoisted(() => ({
    useSesion: vi.fn(),
    useCart: vi.fn(),
}));

vi.mock("../../context/SesionContext", () => ({
    useSesion: mocks.useSesion,
}));

vi.mock("../../context/CarritoContext", () => ({
    useCart: mocks.useCart,
}));

// Arrange común: dibuja el Navbar con una sesión y una cantidad de ítems dados.
// MemoryRouter es necesario porque los enlaces usan react-router.
function dibujarNavbar(sesion, totalItems = 0) {
    mocks.useSesion.mockReturnValue({ cerrarSesion: vi.fn(), ...sesion });
    mocks.useCart.mockReturnValue({ totalItems });

    return render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );
}

describe("Navbar", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("visitante (sin sesión)", () => {
        it("muestra Iniciar Sesión y Registrarse, y oculta las opciones de usuario", () => {
            dibujarNavbar({ usuario: null });

            expect(screen.getByText("Iniciar Sesión")).toBeInTheDocument();
            expect(screen.getByText("Registrarse")).toBeInTheDocument();
            expect(screen.queryByText("Cerrar sesión")).not.toBeInTheDocument();
            expect(screen.queryByText("Administración")).not.toBeInTheDocument();
        });

        it("muestra los enlaces generales de navegación", () => {
            dibujarNavbar({ usuario: null });

            expect(screen.getByText("Página Principal")).toBeInTheDocument();
            expect(screen.getByText("Catálogo")).toBeInTheDocument();
            expect(screen.getByText("Blogs")).toBeInTheDocument();
        });
    });

    describe("usuario con sesión", () => {
        const comprador = { nombres: "Camila", rol: "Comprador" };

        it("saluda por el nombre y muestra Cerrar sesión en vez de Iniciar Sesión", () => {
            dibujarNavbar({ usuario: comprador });

            expect(screen.getByText("Hola, Camila")).toBeInTheDocument();
            expect(screen.getByText("Cerrar sesión")).toBeInTheDocument();
            expect(screen.queryByText("Iniciar Sesión")).not.toBeInTheDocument();
            expect(screen.queryByText("Registrarse")).not.toBeInTheDocument();
        });

        it("no muestra el enlace Administración si el rol no es administrador", () => {
            dibujarNavbar({ usuario: comprador });

            expect(screen.queryByText("Administración")).not.toBeInTheDocument();
        });

        it("muestra el enlace Administración si el rol es Administrador", () => {
            dibujarNavbar({ usuario: { nombres: "Camila", rol: "Administrador" } });

            expect(screen.getByText("Administración")).toBeInTheDocument();
        });

        it("llama a cerrarSesion al hacer clic en Cerrar sesión", async () => {
            const cerrarSesion = vi.fn(); // mock: registra si fue llamada
            dibujarNavbar({ usuario: comprador, cerrarSesion });

            await userEvent.click(screen.getByText("Cerrar sesión"));

            expect(cerrarSesion).toHaveBeenCalledTimes(1);
        });
    });

    describe("menú hamburguesa", () => {
        it("empieza cerrado y se abre al presionar el botón", async () => {
            const { container } = dibujarNavbar({ usuario: null });
            const nav = container.querySelector("nav");

            expect(nav).not.toHaveClass("activo");

            await userEvent.click(container.querySelector(".boton-hamburguesa"));

            expect(nav).toHaveClass("activo");
        });

        it("se cierra al hacer clic en un enlace", async () => {
            const { container } = dibujarNavbar({ usuario: null });
            const nav = container.querySelector("nav");

            await userEvent.click(container.querySelector(".boton-hamburguesa"));
            expect(nav).toHaveClass("activo");

            await userEvent.click(screen.getByText("Catálogo"));

            expect(nav).not.toHaveClass("activo");
        });
    });

    describe("carrito", () => {
        it("muestra la cantidad de ítems del carrito", () => {
            dibujarNavbar({ usuario: null }, 3);

            expect(screen.getByText("3")).toBeInTheDocument();
        });
    });
});