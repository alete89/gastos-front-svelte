export async function fetchMonedas() {
  const response = await fetch('http://localhost:3000/monedas')
  const monedas = await response.json()
  return monedas
}

export async function fetchTarjetas() {
  const response = await fetch('http://localhost:3000/tarjetas')
  const tarjetas = await response.json()
  return tarjetas
}

export async function fetchTags() {
  const response = await fetch('http://localhost:3000/tags')
  const tags = await response.json()
  return tags
}

export async function crearTag(tag) {
  const response = await fetch('http://localhost:3000/tags/new', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify({ nombre: tag }),
  })
}

export async function fetchGastos(mes, anio, tarjeta) {
  let json = {}
  json.mes = mes
  json.anio = anio
  json.id_tarjeta = tarjeta.id
  const response = await fetch('http://localhost:3000/gastos/mes', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'put',
    body: JSON.stringify(json),
  })

  if (response) {
    if (response.ok) {
      const gastos = await response.json()
      return gastos
    }
  }
}

export async function crearGasto(gasto) {
  const fecha = new Date(gasto.fecha)
  gasto.anio = fecha.getFullYear()
  gasto.mes = fecha.getMonth()
  gasto.dia = fecha.getDate() + 1
  const response = await fetch('http://localhost:3000/gasto', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify(gasto),
  })
}
