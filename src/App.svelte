<script>
  import { onMount } from 'svelte'
  import Nav from './components/nav.svelte'
  import Routes from './Routes.svelte'
  import { refreshToken } from './services/auth'

  let loading = true

  onMount(async () => {
    await refreshToken()
    loading = false
  })
</script>

{#if loading}
  loading
{:else}
  <Nav />
  <Routes />
{/if}

<style>
</style>
