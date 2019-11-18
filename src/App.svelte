<script>
  import Preview from './components/preview.svelte'
  import NewGasto from './components/new-gasto.svelte'
  import Summary from './components/summary.svelte'
  import { Router, Route, Link } from 'svero'
  import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'sveltestrap'
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
  </Nav>
</Navbar>

<Router>
  <Route exact path="/" component={Preview} />
  <Route path="/gasto" component={NewGasto} />
  <Route path="/summary" component={Summary} />
</Router>

<!-- another way to route -->
<!-- <Route path="/gasto">
    <NewGasto />
  </Route> -->
