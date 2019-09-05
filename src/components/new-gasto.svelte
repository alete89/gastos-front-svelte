<script>
  import { Button, Form, FormGroup, FormText, Input, Label } from "sveltestrap";
  import { onMount } from "svelte";

  let grupo = "";
  let listaCheck = [];
  let gasto = {
    producto: undefined,
    comercio: undefined,
    monto_total: undefined,
    moneda: undefined,
    cuotas: undefined,
    fecha: new Date().toISOString().slice(0, 10),
    mes_primer_resumen: undefined,
    paga_iva: undefined,
    monto_iva: undefined,
    tags: undefined,
    tarjeta: undefined,
    comentario: undefined
  };
  let monedas = [];
  let tarjetas = [];
  let somevalue = "";

  onMount(doOnMount);

  async function doOnMount() {
    await fetchMonedas();
    await fetchTarjetas();
    await firstSelectionWorkaround();
    console.log(gasto);
  }

  async function firstSelectionWorkaround() {
    gasto.moneda = monedas[0].id;
    gasto.tarjeta = tarjetas[0].id;
  }

  async function fetchMonedas() {
    const response = await fetch("http://localhost:3000/monedas");
    const json = await response.json();
    monedas = json;
  }

  async function fetchTarjetas() {
    const response = await fetch("http://localhost:3000/tarjetas");
    const json = await response.json();
    tarjetas = json;
    console.log(tarjetas);
  }

  async function handleSubmit() {
    const response = await fetch("http://localhost:3000/gasto", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(gasto)
    });
  }

  async function handleTest() {
    console.log("gasto: ", gasto);
  }
</script>

<style>
  .centrado {
    margin: auto;
    margin-bottom: 2rem;
    margin-top: 4rem;
    width: 50% !important;
  }
  .titulo {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    background-color: black;
    color: white;
  }

  .margen {
    margin-top: 2rem;
    margin-bottom: 2rem;
    margin-left: 5rem;
    margin-right: 5rem;
  }
</style>

<head>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
</head>

<div class="card centrado">
  <div class="card-header titulo">Agregar gasto</div>
  <div class="margen">
    <Form>
      <FormGroup>
        <Label for="producto">Producto</Label>
        <Input
          type="text"
          name="producto"
          id="producto"
          placeholder="Producto"
          bind:value={gasto.producto} />
      </FormGroup>
      <FormGroup>
        <Label for="comercio">Comercio</Label>
        <Input
          type="text"
          name="comercio"
          id="comercio"
          placeholder="Comercio"
          bind:value={gasto.comercio} />
      </FormGroup>
      <FormGroup>
        <Label for="monto_total">Monto total</Label>
        <Input
          type="number"
          name="monto_total"
          id="monto_total"
          placeholder="Monto total"
          bind:value={gasto.monto_total} />
      </FormGroup>
      <FormGroup>
        <Label for="cuotas">Cuotas</Label>
        <Input
          type="number"
          name="cuotas"
          id="cuotas"
          placeholder="Cuotas"
          bind:value={gasto.cuotas} />
      </FormGroup>
      <FormGroup>
        <Label for="moneda">Moneda</Label>
        <select bind:value={gasto.moneda} name="moneda" id="moneda">
          {#each monedas as moneda}
            <option value={moneda.id}>{moneda.nombre}</option>
          {/each}
        </select>
      </FormGroup>
      <FormGroup>
        <Label for="exampleDate">Date</Label>
        <Input
          type="date"
          name="date"
          id="exampleDate"
          placeholder="date placeholder"
          bind:value={gasto.fecha} />
      </FormGroup>
      <FormGroup>
        <Label for="tarjeta">Tarjeta</Label>
        <select bind:value={gasto.tarjeta} name="tarjeta" id="tarjeta">
          {#each tarjetas as tarjeta}
            <option value={tarjeta.id}>{tarjeta.nombre}</option>
          {/each}
        </select>
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Text Area</Label>
        <Input type="textarea" name="text" id="exampleText" />
      </FormGroup>
      <FormGroup>
        <input type="radio" bind:group={grupo} value="Uno" />
        Uno
        <input type="radio" bind:group={grupo} value="Dos" />
        Dos
        <input type="radio" bind:group={grupo} value="Tres" />
        Tres
      </FormGroup>
      <FormGroup>
        <input type="checkbox" bind:group={listaCheck} value="A" />
        A
        <input type="checkbox" bind:group={listaCheck} value="B" />
        B
        <input type="checkbox" bind:group={listaCheck} value="C" />
        C
        <input type="checkbox" bind:group={listaCheck} value="D" />
        D
      </FormGroup>
      <Button
        color="primary"
        disabled={!gasto.producto}
        on:click={handleSubmit}>
        Crear Gasto
      </Button>
      <Button color="success" on:click={handleTest}>TEST</Button>
    </Form>
  </div>
</div>
