import { useState } from 'react';
import { esCorreoValido, esCampoVacio } from '../utils/validaciones';

export default function useLogin(alIniciarSesion) {
  const [valores, setValores] = useState({ correo: '', contrasenia: '' });
  const [errores, setErrores] = useState({ correo: '', contrasenia: '' });
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState({ texto: '', esExito: false });

  const alCambiar = (e) => {
    const { id, value } = e.target;
    setValores((prev) => ({ ...prev, [id]: value }));

    if (errores[id]) {
      setErrores((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const alEnviar = (e) => {
    e.preventDefault();

    const errorCorreo = !esCorreoValido(valores.correo)
      ? 'Correo inválido. Solo se aceptan los dominios de @duoc.cl, @profesor.duoc.cl o @gmail.com.'
      : '';

    const errorContraseña = esCampoVacio(valores.contrasenia)
      ? 'La contraseña es obligatoria'
      : '';

    if (errorCorreo || errorContraseña) {
      setErrores({ correo: errorCorreo, contraseña: errorContraseña });
      setMensajeConfirmacion({ texto: 'Por favor, revise los campos marcados.', esExito: false });
      return;
    }

    setErrores({ correo: '', contraseña: '' });

    const exito = alIniciarSesion(valores);
    setMensajeConfirmacion(
      exito
        ? { texto: 'Inicio de sesión exitoso.', esExito: true }
        : { texto: 'Correo o contraseña incorrectos.', esExito: false }
    );
  };

  return { valores, errores, mensajeConfirmacion, alCambiar, alEnviar };
}