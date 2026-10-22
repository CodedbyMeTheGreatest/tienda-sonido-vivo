import { useState } from "react";

const COLORES = ["#d32f2f", "#1a1a1a", "#f5c518", "#ff8a80"];

function entre(min, max) {
    return min + Math.random() * (max - min);
}

function crearPiezas(cantidad) {
    return Array.from({ length: cantidad }, () => ({
        izquierda: entre(0, 100),
        retraso: entre(0, 2.5),
        duracion: entre(2.5, 4.5),
        ancho: entre(6, 12),
        alto: entre(10, 18),
        deriva: entre(-80, 80),
        giro: entre(360, 1080) * (Math.random() < 0.5 ? -1 : 1),
        color: COLORES[Math.floor(Math.random() * COLORES.length)],
    }));
}

function AnimacionExito() {
    const [piezas] = useState(() => crearPiezas(150));

    return (
        <>
            <div className="confeti" aria-hidden="true">
                {piezas.map((p, i) => (
                    <span
                        key={i}
                        className="confeti-pieza"
                        style={{
                            left: `${p.izquierda}%`,
                            width: `${p.ancho}px`,
                            height: `${p.alto}px`,
                            animationDelay: `calc(var(--llegada) + ${p.retraso}s)`,
                            animationDuration: `${p.duracion}s`,
                            backgroundColor: p.color,
                            "--giro": `${p.giro}deg`,
                            "--deriva": `${p.deriva}px`,
                        }}
                    />
                ))}
            </div>

            <div className="exito-escenario" aria-hidden="true">
                <svg className="exito-carrito" viewBox="0 0 64 48">
                    <polygon points="13,12 58,12 52,32 18,32" fill="#ffcdd2" />
                    <polyline
                        points="2,4 10,4 18,32 52,32 58,12 13,12"
                        fill="none"
                        stroke="#d32f2f"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <g className="exito-rueda">
                        <circle cx="24" cy="39" r="5" fill="#1a1a1a" />
                        <line x1="24" y1="35" x2="24" y2="43" stroke="#fff" strokeWidth="1.5" />
                        <line x1="20" y1="39" x2="28" y2="39" stroke="#fff" strokeWidth="1.5" />
                    </g>
                    <g className="exito-rueda">
                        <circle cx="46" cy="39" r="5" fill="#1a1a1a" />
                        <line x1="46" y1="35" x2="46" y2="43" stroke="#fff" strokeWidth="1.5" />
                        <line x1="42" y1="39" x2="50" y2="39" stroke="#fff" strokeWidth="1.5" />
                    </g>
                </svg>

                <svg className="exito-icono" viewBox="0 0 52 52">
                    <circle className="exito-circulo" cx="26" cy="26" r="24" />
                    <path className="exito-check" d="M14 27l8 8 16-17" fill="none" />
                </svg>
            </div>
        </>
    );
}

export default AnimacionExito;