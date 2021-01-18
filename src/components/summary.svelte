<script>
  import { onMount } from 'svelte'
  import { getTotales } from '../services/appService.js'
  import { formatDecimal } from '../helpers'

  let reportesTarjeta = []
  let tarjetas = []
  let subtotales = []

  onMount(async function () {
    reportesTarjeta = await getTotales()
    tarjetas = reportesTarjeta.tarjetas
    subtotales = reportesTarjeta.subtotales
  })
</script>

<style>
</style>

<div class="container margen">
  <h2 class="texto-centrado"><strong>Summary</strong></h2>
  <div class="table-responsive">
    <table class="table texto-centrado table-bordered table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Tarjeta</th>
          <th>Mes pasado</th>
          <th>Este Mes</th>
          <th>Siguiente Mes</th>
        </tr>
      </thead>
      <tbody>
        {#each tarjetas as reporte}
          <tr>
            <td>{reporte.tarjeta}</td>
            {#each reporte.totales as total}
              <td>${formatDecimal(total)}</td>
            {/each}
          </tr>
        {/each}
        <tr>
          <td><strong>Totales</strong></td>
          {#each subtotales as subtotal}
            <td><strong>${formatDecimal(subtotal)}</strong></td>
          {/each}
        </tr>
      </tbody>
    </table>
  </div>
</div>
