<script>
  import { navigate } from 'svelte-navigator'
  import { Button, Form, FormGroup, Input, Label } from 'sveltestrap'
  import { notifier } from '../notifier'
  import { register } from '../services/auth'

  let email = ''
  let password = ''
  let passwordAgain = ''

  $: passwordOk = password === passwordAgain && password != ''

  async function handleRegister(e) {
    console.log(email, password)
    try {
      console.log()
      e.preventDefault()
      await register({ email, password })
      notifier.success(`Usuario ${email} registrado`, 2500)
      navigate('/login')
    } catch (err) {
      notifier.error(err)
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

<Form>
  <div class="card tarjeta">
    <div class="margen">
      <div class="row">
        <div class="col">
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="your@email.com"
              autocomplete="username"
              bind:value={email} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              autocomplete="new-password"
              bind:value={password} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Repeat password</Label>
            <Input
              type="password"
              name="password"
              id="password-again"
              placeholder="password"
              autocomplete="new-password"
              bind:value={passwordAgain} />
          </FormGroup>
        </div>
      </div>
      <div style="text-align:center;">
        <Button color="primary" on:click={handleRegister} disabled={!passwordOk}>Register</Button>
      </div>
    </div>
  </div>
</Form>
