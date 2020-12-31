import { writable } from 'svelte/store'

export const accessToken = writable(getCookieValue('uid') || null)

function getCookieValue(key) {
  const matchingCookies = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)')
  return matchingCookies ? matchingCookies.pop() : ''
}

// export const setAccessToken = (newToken) => {
//   accessToken = newToken
// }

// export const getAccessToken = () => {
//   return accessToken
// }
