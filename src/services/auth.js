// import { getAccessToken, setAccessToken } from '../accessToken'
import { backendUrl } from '../constants'
import { get } from 'svelte/store'
import { accessToken } from '../accessToken'

// const at = get(accessToken)

var at
accessToken.subscribe(async (value) => {
  at = await value
})

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
  accessToken.update(async (current) => {
    return await response.json()
  })

  // setAccessToken(accessToken)
  // console.log(accessToken)
  console.log(at)
  return response
}

export const validate = async () => {
  // const accessToken = getAccessToken()
  const response = await fetch(`${backendUrl}/validate`, {
    headers: {
      // authorization: accessToken ? `bearer ${accessToken}` : '',
      authorization: at ? `bearer ${at}` : '',
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
  const { accessToken: newAccessToken } = await response.json()
  // console.log(`refreshed: ${accessToken}`)
  accessToken.update(async (current) => {
    return newAccessToken
  })
  // setAccessToken(accessToken)
}
