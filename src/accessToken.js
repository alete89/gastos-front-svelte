let accessToken = ''

export const setAccessToken = (newToken) => {
  accessToken = newToken
}

export const getAccessToken = () => {
  return accessToken
}
