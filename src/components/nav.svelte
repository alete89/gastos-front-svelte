<script>
  import { Link, Router } from 'svelte-navigator'
  import { Nav, Navbar, NavbarBrand } from 'sveltestrap'
  import { accessToken } from '../accessToken'
  import { logout } from '../services/auth'

  const handleLogout = async () => {
    await logout()
  }
</script>

<head>
  <style>
    a {
      color: white !important;
      margin-left: 1rem;
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
      {#if !$accessToken}
        <Link to="/login">Login?</Link>
        <Link to="/register">Register?</Link>
      {/if}
      {#if $accessToken}
        <Link on:click={handleLogout} to="/">Logout</Link>
        <Link to="/tarjetas">Tarjetas</Link>
      {/if}
    </Router>
  </Nav>
</Navbar>
