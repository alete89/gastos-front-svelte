<script>
  import { Route, Router } from 'svelte-navigator'
  import PrivateRoute from './PrivateRoute.svelte'
  import Login from './components/login.svelte'
  import NewGasto from './components/new-gasto.svelte'
  import Preview from './components/preview.svelte'
  import Register from './components/register.svelte'
  import Summary from './components/summary.svelte'
  import NewTarjeta from './components/new-tarjeta.svelte'
  import Notification from './components/notification.svelte'
</script>

<Router>
  <PrivateRoute path="/" let:location>
    <Preview />
  </PrivateRoute>
  <Route exact path="/login" component={Login} />
  <Route exact path="/register" component={Register} />
  <PrivateRoute path="/gasto" let:location>
    <NewGasto />
  </PrivateRoute>
  <PrivateRoute path="/summary" let:location>
    <Summary />
  </PrivateRoute>
  <PrivateRoute path="/tarjetas" let:location>
    <NewTarjeta />
  </PrivateRoute>
  <Notification />
</Router>
