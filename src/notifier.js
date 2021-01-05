import { writable } from 'svelte/store'

export const notification = writable()

export function showNotification(message, type = 'default', header, timeout) {
  notification.set({ type, message, header, timeout })
  if (timeout) {
    setTimeout(() => {
      clear()
    }, timeout)
  }
}

const clear = () => notification.set()

const error = (msg, timeout) => {
  showNotification(msg, 'danger', 'Error', timeout)
}

const warning = (msg, timeout) => {
  showNotification(msg, 'warning', 'Warning', timeout)
}

const info = (msg, timeout) => {
  showNotification(msg, 'info', 'Info', timeout)
}

const success = (msg, timeout) => {
  showNotification(msg, 'success', 'Bien!', timeout)
}

export const notifier = { error, warning, info, success, clear }
