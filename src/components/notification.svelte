<script>
  import { Toast, ToastBody, ToastHeader } from 'sveltestrap'
  import { notification, notifier } from '../notifier'
</script>

<style>
</style>

{#if $notification}
  <Toast style="position: absolute; top: 1rem; right: 1rem;">
    <ToastHeader class={`bg-${$notification.type}`} style="color:white" toggle={() => notifier.clear()}>
      {$notification.header}
    </ToastHeader>
    <ToastBody>{$notification.message}</ToastBody>
  </Toast>
{/if}
