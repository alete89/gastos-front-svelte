<script>
  import { Button, FormGroup, Input, Label } from 'sveltestrap'
  import { notifier } from '../notifier'
  import { crearTarjeta } from '../services/appService'

  let tarjeta = {}

  export const diasDeLaSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']

  export const semanaDelMes = [1, 2, 3, 4]

  async function handleSubmit() {
    try {
      console.log('tarjeta', tarjeta)
      await crearTarjeta(tarjeta)
      notifier.success('Tarjeta creada', 2500)
    } catch (error) {
      notifier.error(error)
      console.log(error)
    }
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
              {#each diasDeLaSemana as diaCierre, index}
                <option value={index + 1}>{diaCierre}</option>
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
              {#each diasDeLaSemana as diaVencimiento, index}
                <option value={index + 1}>{diaVencimiento}</option>
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
      <Button color="primary" disabled={!tarjeta.nombre} on:click={handleSubmit}>Crear tarjeta</Button>
    </div>
  </div>
</div>
