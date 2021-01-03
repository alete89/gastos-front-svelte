import { fechaDeHoyFormateada, monthDiff, toDate } from '../services/dateService'

export default class Gasto {
  constructor() {
    this.producto = ''
    this.comercio = ''
    this.monto_total = ''
    this.moneda
    this.cuotas
    this.fecha = fechaDeHoyFormateada()
    this.anio
    this.mes
    this.dia
    this.fecha_primer_resumen
    this.paga_iva
    this.monto_iva
    this.tags = []
    this.tarjeta
    this.comentario = ''
  }

  esValido() {
    return (
      this.producto && this.comercio && this.monto_total && this.cuotas && this.moneda && this.fecha && this.tarjeta
    )
  }

  numeroDeCuota(anio, mes) {
    return monthDiff(this.fecha_primer_resumen, new Date(anio, mes, 1)) + 1
  }

  static fromJSON(gastoJson) {
    return Object.assign(new Gasto(), gastoJson, {
      fecha: toDate(gastoJson.fecha),
      fecha_primer_resumen: toDate(gastoJson.fecha_primer_resumen),
    })
  }
}
