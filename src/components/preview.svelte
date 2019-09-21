<script>
  import { Table } from "sveltestrap";
  import { onMount } from "svelte";
  import {
    Alert,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Button
  } from "sveltestrap";
  import { getMeses, fetchAnios } from "../services/monthService.js";
  import { fetchTarjetas, fetchGastos } from "../services/appService.js";

  let data = [];
  let tarjetas = [];
  const hoy = new Date();
  let meses = getMeses();
  let anio = hoy.getFullYear();
  let mes = hoy.getMonth();
  let anios = [];
  let error = "";
  let color = "primary";

  onMount(async function() {
    tarjetas = await fetchTarjetas();
    anios = await fetchAnios(tarjetas[0]);
    await getGastos();
  });

  async function getGastos() {
    data = await fetchGastos(mes, anio);
  }

  function formatDate(ISOString) {
    fecha = new Date(ISOString).toISOString().slice(0, 10);
    return fecha;
  }
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
  .selector {
    margin: 1rem;
  }
  .centrado {
    /* margin: auto;
    width: 80% !important; */
  }
</style>

<head>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
</head>

<!-- Alerta para errores -->
<Alert color="danger" isOpen={error} toggle={() => (error = false)}>
  {error}
</Alert>

<div class="centrado">
  <section class="selectores">
    <div class="selector">
      <FormGroup>
        <Label for="anioSelect" />
        <select
          on:change={getGastos}
          bind:value={anio}
          name="anio"
          id="anioSelect">
          {#each anios as anio}
            <option value={anio}>{anio}</option>
          {/each}
        </select>
      </FormGroup>
    </div>
    <FormGroup>
      <div class="selector">
        <Label for="mesSelect" />
        <select
          on:change={getGastos}
          bind:value={mes}
          name="mes"
          id="mesSelect">
          {#each meses as mes}
            <option value={mes.valor}>{mes.descripcion}</option>
          {/each}
        </select>
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
            <td>{gasto.paga_iva}</td>
            <td>{gasto.monto_iva}</td>
            <td>{gasto.tags.map(g => g.nombre)}</td>
            <td>{gasto.tarjeta.nombre}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
