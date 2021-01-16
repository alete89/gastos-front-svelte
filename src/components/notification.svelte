<script>
  import { Toast, ToastBody, ToastHeader } from 'sveltestrap'
  import { notification, notifier } from '../notifier'
</script>

{#if $notification}
  <div class="fixed-top-right">
    <Toast>
      <ToastHeader class={`bg-${$notification.type}`} toggle={() => notifier.clear()}>
        <span class="white-font">
          {$notification.header}
        </span>
      </ToastHeader>
      <ToastBody>{$notification.message}</ToastBody>
    </Toast>
  </div>
{/if}

<style>
  .white-font {
    color: white;
  }
  .fixed-top-right {
    position: absolute;
    top: 5rem;
    right: 1rem;
  }
</style>
