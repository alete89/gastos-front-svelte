<script>
  import { fetchTarjetas, fetchGastos } from '../services/appService.js'
  import { fetchAnios } from '../services/monthService'
  import { onMount } from 'svelte'

  let tarjetas = []

  onMount(async function() {
    tarjetas = await fetchTarjetas()
    anios = await fetchAnios(tarjeta)
    await getGastos()
  })

  function currentMonth() {
    return new Date().getMonth()
  }
</script>

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
      {#each tarjetas as gasto, index}
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{0}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
