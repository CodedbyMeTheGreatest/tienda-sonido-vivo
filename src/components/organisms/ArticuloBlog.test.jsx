import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ArticuloBlog from "./ArticuloBlog";


const articulo = {
    id: 1,
    titulo: "Cómo elegir la guitarra perfecta para ti",
    introduccion: "Elegir la guitarra adecuada puede ser un desafío.",
    secciones: [
        { subtitulo: "1. Decide entre Acústica o Eléctrica", texto: "Si te gusta el rock pesado, probablemente quieras una eléctrica." },
        { subtitulo: "2. Define tu presupuesto", texto: "No necesitas gastar una fortuna en tu primera guitarra." },
        { subtitulo: "3. Pruébala antes de comprar", texto: "El mástil debe sentirse cómodo en tu mano." },
    ],
};

describe("ArticuloBlog", () => {
    it("muestra el título como encabezado principal", () => {
        render(<ArticuloBlog articulo={articulo} />);

        expect(
            screen.getByRole("heading", { level: 2, name: "Cómo elegir la guitarra perfecta para ti" })
        ).toBeInTheDocument();
    });

    it("muestra la introducción", () => {
        render(<ArticuloBlog articulo={articulo} />);

        expect(screen.getByText("Elegir la guitarra adecuada puede ser un desafío.")).toBeInTheDocument();
    });

    it("muestra un subtítulo y un texto por cada sección", () => {
        render(<ArticuloBlog articulo={articulo} />);

        expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
        expect(screen.getByText("2. Define tu presupuesto")).toBeInTheDocument();
        expect(screen.getByText("No necesitas gastar una fortuna en tu primera guitarra.")).toBeInTheDocument();
    });

    it("mantiene el orden de las secciones", () => {
        render(<ArticuloBlog articulo={articulo} />);

        const subtitulos = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);

        expect(subtitulos).toEqual([
            "1. Decide entre Acústica o Eléctrica",
            "2. Define tu presupuesto",
            "3. Pruébala antes de comprar",
        ]);
    });

    it("no muestra subtítulos si el artículo no tiene secciones", () => {
        render(<ArticuloBlog articulo={{ ...articulo, secciones: [] }} />);

        expect(screen.queryAllByRole("heading", { level: 3 })).toHaveLength(0);
        expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    });
});