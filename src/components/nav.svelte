<script>
  import { Nav, Navbar, NavbarBrand, NavLink } from 'sveltestrap'
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
