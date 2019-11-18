<script>
  import { Table } from 'sveltestrap'
  import { fetchTarjetas, fetchGastos, getTotales } from '../services/appService.js'
  import { fetchAnios } from '../services/dateService'
  import { onMount } from 'svelte'

  let reportesTarjeta = []
  let tarjetas = []
  let subtotales = []

  onMount(async function() {
    reportesTarjeta = await getTotales()
    tarjetas = reportesTarjeta.tarjetas
    subtotales = reportesTarjeta.subtotales
  })

  function currentMonth() {
    return new Date().getMonth()
  }
</script>

<style>
  .table {
    text-align: center;
    background-color: #f9f7f7;
  }

  .titulo {
    text-align: center;
  }

  .margen {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
</style>

<div class="container margen">
  <h2 class="titulo">
    <strong>Summary</strong>
  </h2>
  <div class="table-responsive">
    <table class="table table-bordered table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Tarjeta</th>
          <th>Mes pasado</th>
          <th>Este Mes</th>
          <th>Siguiente Mes</th>
        </tr>
      </thead>
      <tbody>
        {#each tarjetas as reporte, index}
          <tr>
            <td>{reporte.tarjeta}</td>
            {#each reporte.totales as total, index}
              <td>
                <strong>${parseFloat(Math.round(total * 100) / 100).toFixed(2)}</strong>
              </td>
            {/each}
          </tr>
        {/each}
        <tr>
          <td>Totales</td>
          {#each subtotales as subtotal}
            <td>
              <strong>{subtotal}</strong>
            </td>
          {/each}
        </tr>
      </tbody>
    </table>
  </div>

</div>
