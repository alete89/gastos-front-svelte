<script>
  import { Button, Form, FormGroup, FormText, Input, Label } from 'sveltestrap'
  import { onMount } from 'svelte'
  import { fetchMonedas, fetchTarjetas, fetchTags, crearGasto, crearTag } from '../services/appService.js'
  import Gasto from '../domain/gasto'

  let grupo = ''
  let listaCheck = []
  let gasto = new Gasto()
  let monedas = []
  let tarjetas = []
  let tags = []
  let somevalue = ''
  let newTag = ''

  onMount(doOnMount)

  function fechaDeHoyFormateada() {
    const hoy = new Date()
    return `${hoy.getFullYear()}-${agregarCero(hoy.getMonth() + 1)}-${agregarCero(hoy.getDate())}`
  }

  function agregarCero(dia) {
    if (dia < 10) return `0${dia}`
    else return dia
  }

  async function doOnMount() {
    monedas = await fetchMonedas()
    tarjetas = await fetchTarjetas()
    tags = await fetchTags()
    firstSelectionWorkaround()
  }

  function firstSelectionWorkaround() {
    gasto.moneda = monedas[0].id
    gasto.tarjeta = tarjetas[0].id
  }

  async function handleSubmit() {
    crearGasto(gasto)
    gasto = new Gasto()
    newTag = ''
    firstSelectionWorkaround()
  }

  async function nuevoTag() {
    await crearTag(newTag)
    tags = await fetchTags()
    newTag = ''
  }

  // $: caca = console.log(gasto)
</script>

<style>
  .tarjeta {
    background-color: #f9f7f7;
    margin: auto;
    margin-bottom: 2rem;
    margin-top: 4rem;
    width: 50% !important;
  }
  .titulo {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    background-color: #112d4e;
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
</head>

<div class="card tarjeta">
  <div class="card-header titulo">Agregar gasto</div>
  <div class="margen">
    <FormGroup>
      <Label for="producto">Producto</Label>
      <Input type="text" name="producto" id="producto" placeholder="Producto" bind:value={gasto.producto} />
    </FormGroup>
    <FormGroup>
      <Label for="comercio">Comercio</Label>
      <Input type="text" name="comercio" id="comercio" placeholder="Comercio" bind:value={gasto.comercio} />
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
      <Input type="number" name="cuotas" id="cuotas" placeholder="Cuotas" bind:value={gasto.cuotas} />
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
      <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" bind:value={gasto.fecha} />
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
      <Label for="tags">Tags</Label>
      <select id="tags" bind:value={gasto.tags} multiple>
        {#each tags as tag}
          <option value={tag.id}>{tag.nombre}</option>
        {/each}
      </select>
      <Input type="text" name="new-tag" id="new-tag" placeholder="nombre" bind:value={newTag} />
      <Button color="primary" disabled={!newTag} on:click={nuevoTag}>Crear tag</Button>
    </FormGroup>
    <!-- <Label for="new-tag">Crear tag</Label> -->
    <FormGroup>
      <Label for="exampleText">Comentario</Label>
      <Input bind:value={gasto.comentario} type="textarea" name="text" id="comentarioInput" />
    </FormGroup>
    <Button color="primary" disabled={!gasto.producto} on:click={handleSubmit}>Crear Gasto</Button>
  </div>
</div>
