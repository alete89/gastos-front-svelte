import { getAccessToken, setAccessToken } from '../accessToken'
import { backendUrl } from '../constants'

export const register = async ({ email, password }) => {
  const response = await fetch(`${backendUrl}/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  const responseJson = await response.json()
  if (!response.ok) {
    throw responseJson
  }
}

export const login = async ({ email, password }) => {
  const response = await fetch(`${backendUrl}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  const accessToken = await response.json()
  setAccessToken(accessToken)
  console.log(accessToken)
  return response
}

export const validate = async () => {
  const accessToken = getAccessToken()
  const response = await fetch(`${backendUrl}/validate`, {
    headers: {
      authorization: accessToken ? `bearer ${accessToken}` : '',
    },
  })
  const json = await response.json()
  return json
}

export const refreshToken = async () => {
  const response = await fetch(`${backendUrl}/refresh_token`, {
    method: 'POST',
    credentials: 'include',
  })
  const { accessToken } = await response.json()
  console.log(`refreshed: ${accessToken}`)
  setAccessToken(accessToken)
}
