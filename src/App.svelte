<script>
  import Preview from './components/preview.svelte'
  import NewGasto from './components/new-gasto.svelte'
  import { Router, Route, Link } from 'svero'
</script>

<nav>
  <Link href="/">Home</Link>
  <Link href="/gasto">Nuevo</Link>
  <Link href="/dos">dos</Link>
</nav>

<Router>
  <Route exact path="/" component={Preview} />
  <Route path="/gasto">
    <NewGasto nombre="asd" />
  </Route>
</Router>
