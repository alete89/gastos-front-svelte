export async function fetchAnios(tarjeta) {
  const response = await fetch(`http://localhost:3000/anios/${tarjeta.id}`)
  return await response.json()
}

export function getMeses() {
  let meses = [
    mes('Enero', 0),
    mes('Febrero', 1),
    mes('Marzo', 2),
    mes('Abril', 3),
    mes('Mayo', 4),
    mes('Junio', 5),
    mes('Julio', 6),
    mes('Agosto', 7),
    mes('Septiembre', 8),
    mes('Octubre', 9),
    mes('Noviembre', 10),
    mes('Diciembre', 11),
  ]
  return meses
}

function mes(descripcion, valor) {
  let mes = {}
  mes.descripcion = descripcion
  mes.valor = valor
  return mes
}

export function monthDiff(d1, d2) {
  let months
  months = (d2.getFullYear() - d1.getFullYear()) * 12
  months -= d1.getMonth()
  months += d2.getMonth()
  return months <= 0 ? 0 : months
}

export function fechaDeHoyFormateada() {
  const hoy = new Date()
  return `${hoy.getFullYear()}-${agregarCero(hoy.getMonth() + 1)}-${agregarCero(hoy.getDate())}`
}

export function agregarCero(dia) {
  if (dia < 10) return `0${dia}`
  else return dia
}