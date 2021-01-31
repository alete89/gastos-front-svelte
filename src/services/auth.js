import { accessToken } from '../accessToken'
import { backendUrl } from '../constants'
import { fetchDefaults } from './fetchDefaults'

export const register = async ({ email, password }) => {
  const response = await fetch(`${backendUrl}/register`, {
    method: 'POST',
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
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw "Login incorrecto"
  }

  accessToken.set(await response.json())

  // setAccessToken(accessToken)
  // console.log(accessToken)
  // console.log(at)
  return response
}

export const validate = async () => {
  const response = await fetchDefaults(`/validate`)
  const json = await response.json()
  return json
}

export const refreshToken = async () => {
  const response = await fetch(`${backendUrl}/refresh_token`, {
    method: 'POST',
    credentials: 'include',
  })
  const { accessToken: newAccessToken } = await response.json()
  accessToken.update(async (current) => {
    return newAccessToken
  })
}

export const logout = async () => {
  const response = await fetchDefaults(`/logout`, {
    method: 'POST',
  })
  accessToken.set(null)
}
