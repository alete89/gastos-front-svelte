<script>
  import { useNavigate, useLocation } from 'svelte-navigator'
  import { accessToken } from './accessToken'

  const navigate = useNavigate()
  const location = useLocation()

  $: if (!$accessToken) {
    navigate('/login', {
      state: { from: $location.pathname },
      replace: true,
    })
  }
</script>

{#if $accessToken}
  <slot />
{/if}
