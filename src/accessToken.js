import { writable } from 'svelte/store'

const getCookieValue = (key) => {
  const matchingCookies = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)')
  return matchingCookies ? matchingCookies.pop() : ''
}

export const accessToken = writable(getCookieValue('uid') || null)

// export const setAccessToken = (newToken) => {
//   accessToken = newToken
// }

// export const getAccessToken = () => {
//   return accessToken
// }
