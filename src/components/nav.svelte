<script>
  import { Link, Router } from 'svelte-navigator'
  import { Nav, Navbar, NavbarBrand } from 'sveltestrap'
  import { logout } from '../services/auth'

  const handleLogout = async () => {
    await logout()
  }
</script>

<head>
  <style>
    a {
      color: white !important;
    }
  </style>
</head>

<Navbar color="dark" class="mb-2 sasa">
  <NavbarBrand to="/">Gastos</NavbarBrand>
  <Nav>
    <Router>
      <Link to="/">Home</Link>
      <Link to="/summary">Summary</Link>
      <Link to="/gasto">Nuevo</Link>
      <Link to="/login">Login?</Link>
      <Link to="/register">Register?</Link>
      <Link on:click={handleLogout} to="/">Logout</Link>
    </Router>
  </Nav>
</Navbar>
