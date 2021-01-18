<script>
  import { navigate } from 'svelte-navigator'
  import { Button, Form, FormGroup, Input, Label } from 'sveltestrap'
  import { notifier } from '../notifier'
  import { register } from '../services/auth'
  import Joi from 'joi'

  let email = ''
  let password = ''
  let passwordAgain = ''
  const errors = {}
  const schema = Joi.string().email({ tlds: { allow: false } })

  $: passwordOk = password === passwordAgain && password != ''

  $: emailOk = !schema.validate(email).error

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
              bind:value={email}
              on:blur={() => {
                errors.email = !emailOk
              }}
            />
            <span class="error">{errors.email ? 'ingrese un email válido' : ''}</span>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              autocomplete="new-password"
              bind:value={password}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Repeat password</Label>
            <Input
              type="password"
              name="password"
              id="password-again"
              placeholder="password"
              autocomplete="new-password"
              bind:value={passwordAgain}
              on:blur={() => {
                errors.password = !passwordOk
              }}
            />
            <span class="error">{errors.password ? 'las passwords deben coincidir' : ''}</span>
          </FormGroup>
        </div>
      </div>
      <div class="texto-centrado">
        <Button color="primary" on:click={handleRegister} disabled={!passwordOk || !emailOk}>Register</Button>
      </div>
    </div>
  </div>
</Form>

<style>
  .error {
    color: red;
  }
</style>
