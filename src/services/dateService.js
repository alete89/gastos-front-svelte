import { authFetch } from './authFetch'

export async function fetchAnios(tarjeta) {
  const response = await authFetch(`/anios/${tarjeta.id}`)
  const anios = await response.json()
  return anios
}

export const fetchMeses = async (anio, tarjeta) => {
  const response = await authFetch(`/meses/${anio}/tarjeta/${tarjeta.id}`)
  if (!response.ok) {
    return mesesDefault
  }
  const meses = await response.json()
  return meses
}

const mesesDefault = [
  mes('Enero'),
  mes('Febrero'),
  mes('Marzo'),
  mes('Abril'),
  mes('Mayo'),
  mes('Junio'),
  mes('Julio'),
  mes('Agosto'),
  mes('Septiembre'),
  mes('Octubre'),
  mes('Noviembre'),
  mes('Diciembre'),
]

function mes(descripcion) {
  return { descripcion, tieneGastos: false }
}

export function monthDiff(d1, d2) {
  let months
  months = (d2.getFullYear() - d1.getFullYear()) * 12
  months -= d1.getMonth()
  months += d2.getMonth()
  return months <= 0 ? 0 : months
}

export const toDate = (dateString) => {
  const fecha = dateString.split(/\D/)
  return new Date(Number(fecha[0]), Number(fecha[1]) - 1, Number(fecha[2]))
}

export function fechaDeHoyFormateada() {
  const hoy = new Date()
  return `${hoy.getFullYear()}-${agregarCero(hoy.getMonth() + 1)}-${agregarCero(hoy.getDate())}`
}

export function agregarCero(dia) {
  if (dia < 10) return `0${dia}`
  else return dia
}
