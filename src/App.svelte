<script>
  import Preview from './components/preview.svelte'
  import NewGasto from './components/new-gasto.svelte'
  import Summary from './components/summary.svelte'
  import { Router, Route, Link } from 'svero'
</script>

<nav>
  <Link href="/summary">Summary</Link>
  <Link href="/">Home</Link>
  <Link href="/gasto">Nuevo</Link>
</nav>

<Router>
  <Route exact path="/" component={Preview} />
  <Route path="/gasto" component={NewGasto} />
  <Route path="/summary" component={Summary} />
</Router>

<!-- another way to route -->
<!-- <Route path="/gasto">
    <NewGasto />
  </Route> -->
