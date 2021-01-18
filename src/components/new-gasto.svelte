<script>
  import { onMount } from 'svelte'
  import { Button, FormGroup, Input, Label } from 'sveltestrap'
  import Gasto from '../domain/gasto'
  import { notifier } from '../notifier'
  import { crearGasto, crearTag, fetchMonedas, fetchTags, fetchTarjetas } from '../services/appService.js'

  let gasto = new Gasto()
  let monedas = []
  let tarjetas = []
  let tags = []
  let newTag = ''
  let isOpen = false
  onMount(doOnMount)

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
    try {
      await crearGasto(gasto)
      notifier.success('Gasto creado con éxito', 2500)
    } catch (error) {
      notifier.error(error)
      console.log(error)
    }
    gasto = new Gasto()
    newTag = ''
    firstSelectionWorkaround()
    // window.scrollTo(0, 0)
    toggle()
    setTimeout(() => {
      toggle()
    }, 2000)
  }

  async function nuevoTag() {
    await crearTag(newTag)
    tags = await fetchTags()
    newTag = ''
  }

  function toggle() {
    isOpen = !isOpen
  }
</script>

<div class="card tarjeta">
  <div class="titulo">
    <div class="card-header">Nuevo gasto</div>
  </div>
  <div class="margen">
    <div class="row">
      <div class="col">
        <FormGroup>
          <Label for="producto">Producto</Label>
          <Input type="text" name="producto" id="producto" placeholder="Producto" bind:value={gasto.producto} />
        </FormGroup>
      </div>
      <div class="col">
        <FormGroup>
          <Label for="comercio">Comercio</Label>
          <Input type="text" name="comercio" id="comercio" placeholder="Comercio" bind:value={gasto.comercio} />
        </FormGroup>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormGroup>
          <Label for="monto_total">Monto total</Label>
          <Input
            type="number"
            name="monto_total"
            id="monto_total"
            placeholder="Monto total"
            bind:value={gasto.monto_total}
          />
        </FormGroup>
      </div>
      <div class="col">
        <FormGroup>
          <Label for="cuotas">Cuotas</Label>
          <Input type="number" name="cuotas" id="cuotas" placeholder="Cuotas" bind:value={gasto.cuotas} />
        </FormGroup>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormGroup>
          <Label for="fecha">Fecha</Label>
          <Input type="date" name="fecha" id="fecha" placeholder="02/01/2021" bind:value={gasto.fecha} />
        </FormGroup>
      </div>
      <div class="col">
        <div class="row">
          <div class="col">
            <FormGroup>
              <Label for="moneda">Moneda</Label>
              <div>
                <select bind:value={gasto.moneda} name="moneda" id="moneda">
                  {#each monedas as moneda}
                    <option value={moneda.id}>{moneda.nombre}</option>
                  {/each}
                </select>
              </div>
            </FormGroup>
          </div>
          <div class="col">
            <FormGroup>
              <Label for="tarjeta">Tarjeta</Label>
              <div>
                <select bind:value={gasto.tarjeta} name="tarjeta" id="tarjeta">
                  {#each tarjetas as tarjeta}
                    <option value={tarjeta.id}>{tarjeta.nombre}</option>
                  {/each}
                </select>
              </div>
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
    <FormGroup>
      <div class="row">
        <div class="col">
          <Label for="tags">Crear tag</Label>
          <Input type="text" name="new-tag" id="new-tag" placeholder="Nombre" bind:value={newTag} />
          <Button style="margin-top:1rem" color="primary" disabled={!newTag} on:click={nuevoTag}>Crear</Button>
        </div>
        <div class="col">
          <Label for="tags">Tags</Label>
          <div>
            <select id="tags" bind:value={gasto.tags} multiple>
              {#each tags as tag}
                <option value={tag.id}>{tag.nombre}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>
    </FormGroup>
    <FormGroup>
      <Label for="exampleText">Comentario</Label>
      <Input bind:value={gasto.comentario} type="textarea" name="text" id="comentarioInput" />
    </FormGroup>
    <div class="texto-centrado">
      <Button color="primary" disabled={!gasto.esValido()} on:click={handleSubmit}>Crear Gasto</Button>
    </div>
  </div>
</div>
