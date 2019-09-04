<script>
  import { Table } from "sveltestrap";
  import { onMount } from "svelte";
  import { Alert } from "sveltestrap";

  let data = [];
  let error = "";
  onMount(async function() {
    const response = await fetch("http://localhost:3000/gastos").catch(
      e => (error = e)
    );
    if (response) {
      if (response.ok) {
        const json = await response.json();
        data = json;
      }
      if (!response.ok) {
        error = `Error ${response.status}: ${response.statusText}`;
      }
    }
    console.log("el error vale: ", error);
  });

  function formatDate(ISOString) {
    fecha = new Date(ISOString).toISOString().slice(0, 10);
    return fecha;
  }
</script>

<style>
  .table {
    margin: auto;
    width: 80% !important;
    text-align: center;
    background-color:white;
  }
  .thead{
    background-color:#001f3f;
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
          <td>{gasto.mes_primer_resumen}</td>
          <td>{gasto.paga_iva}</td>
          <td>{gasto.monto_iva}</td>
          <td>{gasto.tags.map(g => g.nombre)}</td>
          <td>{gasto.tarjeta.nombre}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
