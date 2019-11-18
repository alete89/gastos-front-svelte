
import { fechaDeHoyFormateada } from '../services/dateService'


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
    return this.producto && this.comercio && this.monto_total && this.cuotas && this.moneda && this.fecha && this.tarjeta
  }

}
