<script>
  import { Table } from 'sveltestrap'
  import { fetchTarjetas, fetchGastos, getTotales } from '../services/appService.js'
  import { fetchAnios } from '../services/monthService'
  import { onMount } from 'svelte'

  let reportesTarjeta = []

  onMount(async function() {
    reportesTarjeta = await getTotales()
    console.log(reportesTarjeta)
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
  {#each reportesTarjeta as reporte, index}
    <h2 class="titulo">
      <strong>{reporte.tarjeta}</strong>
    </h2>
    <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead class="thead-dark">
          <tr>
            <th>Mes pasado</th>
            <th>Este Mes</th>
            <th>Siguiente Mes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {#each reporte.totales as total, index}
              <td>
                <strong>${total}</strong>
              </td>
            {/each}
          </tr>
        </tbody>
      </table>
    </div>
  {/each}

</div>
