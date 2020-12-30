<script>
  import { Nav, Navbar, NavbarBrand, NavLink } from 'sveltestrap'
  import { Router, Route } from 'svelte-routing'
  import Login from './components/login.svelte'
  import Register from './components/register.svelte'
  import NewGasto from './components/new-gasto.svelte'
  import Preview from './components/preview.svelte'
  import Summary from './components/summary.svelte'
</script>

<head>
  <style>
    a {
      color: white !important;
    }
  </style>
</head>

<Navbar color="dark" class="mb-2 sasa">
  <NavbarBrand href="/">Gastos</NavbarBrand>
  <Nav>
    <NavLink href="/">Home</NavLink>
    <NavLink href="/summary">Summary</NavLink>
    <NavLink href="/gasto">Nuevo</NavLink>
    <NavLink href="/login">Login?</NavLink>
    <NavLink href="/register">Register?</NavLink>
  </Nav>
</Navbar>

<Router>
  <Route exact path="/" component={Preview} />
  <Route exact path="/login" component={Login} />
  <Route exact path="/register" component={Register} />
  <Route path="/gasto" component={NewGasto} />
  <Route path="/summary" component={Summary} />
  <Route path="/logout" component={Summary} />
</Router>
