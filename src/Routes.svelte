<script>
  import { Route, Router } from 'svelte-navigator'
  import PrivateRoute from './PrivateRoute.svelte'
  import Login from './components/login.svelte'
  import NewGasto from './components/new-gasto.svelte'
  import Preview from './components/preview.svelte'
  import Register from './components/register.svelte'
  import Summary from './components/summary.svelte'
</script>

<Router>
  <Route exact path="/" component={Preview} />
  <Route exact path="/login" component={Login} />
  <Route exact path="/register" component={Register} />
  <PrivateRoute path="/gasto" let:location>
    <NewGasto />
  </PrivateRoute>
  <Route path="/summary" component={Summary} />
  <Route path="/logout" component={Summary} />
</Router>
