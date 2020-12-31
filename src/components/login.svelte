<script>
  import { Button, FormGroup, Input, Label } from 'sveltestrap'
  import { navigate } from 'svelte-routing'
  import { login } from '../services/auth'

  let email = ''
  let password = ''

  async function handleLogin() {
    try {
      await login({ email, password })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
</script>

<style>
  .tarjeta {
    background-color: #f9f7f7;
    margin: auto;
    margin-bottom: 2rem;
    margin-top: 4rem;
    width: 50% !important;
  }

  .margen {
    margin-top: 2rem;
    margin-bottom: 2rem;
    margin-left: 5rem;
    margin-right: 5rem;
  }
</style>

<head />

<div class="card tarjeta">
  <div class="margen">
    <div class="row">
      <div class="col">
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="text" name="email" id="email" placeholder="email" bind:value={email} />
        </FormGroup>
      </div>
      <div class="col">
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" placeholder="password" bind:value={password} />
        </FormGroup>
      </div>
    </div>
    <div style="text-align:center;">
      <Button color="primary" on:click={handleLogin}>Login</Button>
    </div>
  </div>
</div>

<!-- 
<Toast success style="position: absolute; top: 1rem; right: 1rem;" {isOpen}>
  <ToastHeader>Ok</ToastHeader>
  <ToastBody>Gasto creado con éxito!</ToastBody>
</Toast> -->
