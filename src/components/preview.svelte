<script>
  import { Table, Badge } from 'sveltestrap'
  import { onMount } from 'svelte'
  import { Alert, Form, FormGroup, FormText, Input, Label, Button } from 'sveltestrap'
  import { getMeses, fetchAnios, monthDiff } from '../services/dateService.js'
  import { fetchTarjetas, fetchGastos } from '../services/appService.js'

  let data = []
  let tarjetas = []
  const hoy = new Date()
  let meses = getMeses()
  let anio = hoy.getFullYear()
  let mes = hoy.getMonth()
  let tarjeta
  let anios = []
  let error = ''
  let filterText = ''
  let dataFromServer = []

  const colors = {
    1: 'dark',
    2: 'primary',
    3: 'secondary',
    4: 'success',
    5: 'danger',
    6: 'warning',
    7: 'info',
  }

  onMount(async function() {
    tarjetas = await fetchTarjetas()
    tarjeta = tarjetas[0]
    // anios = await fetchAnios(tarjeta)
    await getGastos()
  })

  async function getGastos() {
    dataFromServer = await fetchGastos(mes, anio, tarjeta)
    data = [...dataFromServer]
    anios = await fetchAnios(tarjeta)
  }

  function filtrarGastos() {
    data = [...dataFromServer]
    if (filterText !== '') {
      data = data.filter(gasto => gasto.tags && gasto.tags.some(tag => tag.nombre.includes(filterText)))
    }
  }

  $: filterByTag = filtrarGastos(filterText)
</script>

<style>
  .table {
    text-align: center;
    background-color: #f9f7f7;
  }
  .selectores {
    background-color: #3f72af;
    color: white;
    display: flex;
    flex-direction: row;
  }
  .input {
    margin: 1rem;
  }
</style>

<head />

<!-- Alerta para errores -->
<Alert color="danger" isOpen={error} toggle={() => (error = false)}>{error}</Alert>

<div class="centrado">
  <section class="selectores">
    <FormGroup>
      <div class="input">
        <Label for="tarjetaSelect" />
        <select on:blur={getGastos} bind:value={tarjeta} name="tarjeta" id="tarjetaSelect">
          {#each tarjetas as tarjeta}
            <option value={tarjeta}>{tarjeta.nombre}</option>
          {/each}
        </select>
      </div>
    </FormGroup>
    <div class="input">
      <FormGroup>
        <Label for="anioSelect" />
        <select on:blur={getGastos} bind:value={anio} name="anio" id="anioSelect">
          {#each anios as anio}
            <option value={anio}>{anio}</option>
          {/each}
        </select>
      </FormGroup>
    </div>
    <FormGroup>
      <div class="input">
        <Label for="mesSelect" />
        <select on:blur={getGastos} bind:value={mes} name="mes" id="mesSelect">
          {#each meses as mes}
            <option value={mes.valor}>{mes.descripcion}</option>
          {/each}
        </select>
      </div>
    </FormGroup>
    <FormGroup>
      <div class="input">
        <Input type="text" name="tagName" id="tagFilter" placeholder="Tag" bind:value={filterText} />
      </div>
    </FormGroup>
  </section>

  <div class="table-responsive">
    <table class="table table-bordered table-hover">
      <thead class="thead-dark">
        <tr>
          <th>#</th>
          <th>Producto</th>
          <th>Comercio</th>
          <th>Monto total</th>
          <th>Moneda</th>
          <th>Cuotas</th>
          <th>Fecha</th>
          <th>First Month</th>
          <th>Nº de cuota</th>
          <th>Paga IVA?</th>
          <th>Monto IVA</th>
          <th>Tags</th>
          <th>Tarjeta</th>
        </tr>
      </thead>
      <tbody>
        {#each data as gasto, index}
          <tr>
            <th scope="row">{index + 1}</th>
            <td>{gasto.producto}</td>
            <td>{gasto.comercio}</td>
            <td>{gasto.monto_total}</td>
            <td>{gasto.moneda.nombre}</td>
            <td>{gasto.cuotas}</td>
            <td>{new Date(gasto.fecha).toISOString().slice(0, 10)}</td>
            <td>{new Date(gasto.fecha_primer_resumen).getMonth() + 1}</td>
            <td>{monthDiff(new Date(gasto.fecha_primer_resumen), new Date(anio, mes, 1)) + 1}/{gasto.cuotas}</td>
            <td>{gasto.paga_iva}</td>
            <td>{gasto.monto_iva}</td>
            <td>
              {#each gasto.tags as tag}
                <Badge color={colors[(tag.id % Object.keys(colors).length) + 1]}>{tag.nombre}</Badge>
              {/each}
            </td>
            <td>{gasto.tarjeta.nombre}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
