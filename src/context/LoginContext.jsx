import { useState } from 'react';

const DOMINIOS_PERMITIDOS = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];

const esCorreoValido = (correo) => {
  if (!correo) return false;
  return DOMINIOS_PERMITIDOS.some(dominio => correo.toLowerCase().endsWith(dominio));
};

const esContraseñaValida = (pass) => {
  return pass && pass.length >= 4 && pass.length <= 10;
};

export default function useLogin(alExitoLogin) {
  const [valores, setValores] = useState({ correo: '', contraseña: '' });
  const [errores, setErrores] = useState({ correo: '', contraseña: '' });
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState({ texto: '', esExito: false });

  const alCambiar = (e) => {
    const { name, value } = e.target;
    setValores(prev => ({ ...prev, [name]: value }));

    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  const alEnviar = (e) => {
    e.preventDefault();

    const errorCorreo = !esCorreoValido(valores.correo)
      ? "Correo inválido. Solo se aceptan los dominios de @duoc.cl, @profesor.duoc.cl o @gmail.com."
      : "";

    const errorContraseña = !esContraseñaValida(valores.contraseña)
      ? "Contraseña incorrecta. Asegúrese de que tenga entre 4 y 10 caracteres."
      : "";

    if (errorCorreo || errorContraseña) {
      setErrores({ correo: errorCorreo, contraseña: errorContraseña });
      setMensajeConfirmacion({
        texto: "Por favor, revise los campos marcados.",
        esExito: false
      });
      return;
    }

    setErrores({ correo: '', contraseña: '' });
    setMensajeConfirmacion({
      texto: "Validación exitosa. Iniciando sesión...",
      esExito: true
    });

    if (alExitoLogin) {
      alExitoLogin(valores);
    }
  };

  return {
    valores,
    errores,
    mensajeConfirmacion,
    alCambiar,
    alEnviar
  };
}