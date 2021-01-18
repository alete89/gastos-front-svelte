<script>
  import { Button, FormGroup, Input, Label } from 'sveltestrap'
  import { useNavigate, useLocation } from 'svelte-navigator'
  import { login } from '../services/auth'
  import { notifier } from '../notifier'

  let email = ''
  let password = ''
  const navigate = useNavigate()
  const location = useLocation()

  async function handleLogin() {
    try {
      notifier.clear()
      await login({ email, password })
      const from = ($location.state && $location.state.from) || '/'
      navigate(from, { replace: true })
    } catch (error) {
      notifier.error(error)
      console.log(error)
    }
  }
</script>

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
    <div class="texto-centrado">
      <Button color="primary" on:click={handleLogin}>Login</Button>
    </div>
  </div>
</div>
