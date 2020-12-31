<script>
  import Routes from './Routes.svelte'
  import Nav from './components/nav.svelte'
  import { accessToken } from './accessToken'

  $: console.log(`access token en app: ${$accessToken}`)
</script>

<Nav />
<Routes />
