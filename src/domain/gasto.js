export default class Gasto {
  constructor() {
    this.producto = ''
    this.comercio = ''
    this.monto_total = ''
    this.moneda
    this.cuotas
    this.fecha = this.fechaDeHoyFormateada()
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

fechaDeHoyFormateada() {
    const hoy = new Date()
    return `${hoy.getFullYear()}-${this.agregarCero(hoy.getMonth() + 1)}-${this.agregarCero(hoy.getDate())}`
  }

agregarCero(dia) {
    if (dia < 10) return `0${dia}`
    else return dia
  }
}
