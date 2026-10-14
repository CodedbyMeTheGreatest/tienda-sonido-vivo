import { useState } from 'react'
import {  esCampoVacio, esTextoValido, esCorreoValido, esRunValido, coincidenContrasenias,} from '../utils/validaciones'

const MIN_CONTRASEÑA = 6;
const MAX_CONTRASEÑA = 20;

const VALORES_INICIALES = {
  run: '', nombres: '', apellidos: '', correo: '',
  contrasenia: '', confirmarContrasenia: '',
  region: '', comuna: '', direccion: '',
}


function validar(v) {
    
    const error = {}

    if(esCampoVacio(v.region)) error.region = "Seleccione una región";
    if(esCampoVacio(v.comuna)) error.comuna = "Seleccione una comuna";
    if(!esTextoValido(v.direccion,1,500)) error.direccion = "La direccion es obligatoria";
    if(!esRunValido(v.run)) error.run = "Ingrese un RUN válido. Ingreselo sin puntos ni guion";
    if(!esTextoValido(v.nombres,1,50)) error.nombres = "Ingrese un nombre válido (1 a 50 caracteres).";
    if(!esTextoValido(v.apellidos,1,50)) error.apellidos = "Ingrese un apellido válido (1 a 50 caracteres).";
    if(!esCorreoValido(v.correo)) error.correo = "Correo inválido. Solo se aceptan @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    if(!esTextoValido(v.contrasenia,MIN_CONTRASEÑA,MAX_CONTRASEÑA)) error.contrasenia = `La contraseña debe tener entre ${MIN_CONTRASEÑA} y ${MAX_CONTRASEÑA} caracteres.`;
    if(!coincidenContrasenias(v.contrasenia,v.confirmarContrasenia)) error.confirmarContrasenia = "Las contraseñas no coinciden";
    return error;
}

export default function useRegistro(alExitoRegistro) {
  const [valores, setValores] = useState(VALORES_INICIALES)
  const [errores, setErrores] = useState({})
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState({ texto: '', esExito: false })

  const alCambiar = (e) => {
    const { id, value } = e.target
    setValores((prev) => ({ ...prev, [id]: value }))
    if (errores[id]) setErrores((prev) => ({ ...prev, [id]: '' }))
  }

  const alEnviar = (e) => {
    e.preventDefault()

    const nuevosErrores = validar(valores)
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      setMensajeConfirmacion({ texto: 'Por favor, revise los campos marcados.', esExito: false })
      return
    }

    try {
      alExitoRegistro(valores)
      setErrores({})
      setValores(VALORES_INICIALES)
      setMensajeConfirmacion({ texto: 'Registro exitoso. Redirigiendo al inicio de sesión...', esExito: true })
    } catch (error) {
      setMensajeConfirmacion({ texto: error.message, esExito: false })
    }
  }

  return { valores, errores, mensajeConfirmacion, alCambiar, alEnviar }
}