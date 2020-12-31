<script>
  import { Button, FormGroup, Input, Label, Toast, ToastBody, ToastHeader } from 'sveltestrap'
  import { crearTarjeta } from '../services/appService'

  let tarjeta = {}
  let isOpen = false

  const diasDeLaSemana = [
    { id: 1, nombre: 'lunes' },
    { id: 2, nombre: 'martes' },
    { id: 3, nombre: 'miercoles' },
    { id: 4, nombre: 'jueves' },
    { id: 5, nombre: 'viernes' },
    { id: 6, nombre: 'sabado' },
    { id: 7, nombre: 'domingo' },
  ]
  const semanaDelMes = [1, 2, 3, 4]

  async function handleSubmit() {
    try {
      console.log('tarjeta', tarjeta)
      await crearTarjeta(tarjeta)
      mostrarToastPor(2000)
    } catch (error) {
      console.log(error)
    }
  }

  const mostrarToastPor = (milisegundos) => {
    toggle()

    setTimeout(() => {
      toggle()
    }, milisegundos)
  }

  function toggle() {
    isOpen = !isOpen
  }

  // $: disabled = !tarjeta.esValido()
</script>

<style>
  .tarjeta {
    background-color: #f9f7f7;
    margin: auto;
    margin-bottom: 2rem;
    margin-top: 4rem;
    width: 20% !important;
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
    margin-left: 3rem;
    margin-right: 3rem;
  }
</style>

<head />

<div class="card tarjeta">
  <div class="card-header titulo">Nueva tarjeta</div>
  <div class="margen">
    <div class="row">
      <div class="col">
        <FormGroup>
          <Label for="nombre">Nombre</Label>
          <Input type="text" name="nombre" id="nombre" placeholder="Visa banco Galicia" bind:value={tarjeta.nombre} />
        </FormGroup>
      </div>
    </div>
    <div class="row">
      <h4>Regla de cierre</h4>
    </div>
    <div class="row">
      <div class="col">
        <FormGroup>
          <Label for="diaCierre">Día</Label>
          <div>
            <select bind:value={tarjeta.diaCierre} name="diaCierre" id="diaCierre">
              {#each diasDeLaSemana as diaCierre}
                <option value={diaCierre.id}>{diaCierre.nombre}</option>
              {/each}
            </select>
          </div>
        </FormGroup>
      </div>
      <div class="col">
        <FormGroup>
          <Label for="semanaCierre">Semana</Label>
          <div>
            <select bind:value={tarjeta.semanaCierre} name="semanaCierre" id="semanaCierre">
              {#each semanaDelMes as semanaCierre}
                <option value={semanaCierre}>{semanaCierre}</option>
              {/each}
            </select>
          </div>
        </FormGroup>
      </div>
    </div>
    <div class="row">
      <h4>Regla de vencimiento</h4>
    </div>
    <div class="row">
      <div class="col">
        <FormGroup>
          <Label for="diaVencimiento">Día</Label>
          <div>
            <select bind:value={tarjeta.diaVencimiento} name="diaVencimiento" id="diaVencimiento">
              {#each diasDeLaSemana as diaVencimiento}
                <option value={diaVencimiento.id}>{diaVencimiento.nombre}</option>
              {/each}
            </select>
          </div>
        </FormGroup>
      </div>
      <div class="col">
        <FormGroup>
          <Label for="semanaVencimiento">Semana</Label>
          <div>
            <select bind:value={tarjeta.semanaVencimiento} name="semanaVencimiento" id="semanaVencimiento">
              {#each semanaDelMes as semanaVencimiento}
                <option value={semanaVencimiento}>{semanaVencimiento}</option>
              {/each}
            </select>
          </div>
        </FormGroup>
      </div>
    </div>
    <div style="text-align:center;">
      <Button color="primary" on:click={handleSubmit}>Crear tarjeta</Button>
    </div>
  </div>
</div>

<Toast success style="position: absolute; top: 1rem; right: 1rem;" {isOpen}>
  <ToastHeader>Ok</ToastHeader>
  <ToastBody>Tarjeta creado con éxito!</ToastBody>
</Toast>
