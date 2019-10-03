export async function fetchAnios(tarjeta) {
  let json = {}
  json.id_tarjeta = tarjeta.id
  const response = await fetch('http://localhost:3000/anios/', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'put',
    body: JSON.stringify(json),
  })
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
