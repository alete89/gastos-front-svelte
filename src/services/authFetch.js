import jwt_decode from "jwt-decode";
import { get } from 'svelte/store';
import { accessToken } from '../accessToken';
import { backendUrl } from '../constants';
import { refreshToken } from './auth';
import { addMinutes } from './dateService';

const addAuthHeader = (options, token = get(accessToken)) => {
    options.headers = {
        ...options.headers,
        authorization: token ? `Bearer ${token}` : '',
    }

    return options
}

const refreshExpiredToken = async () => {

    const token = get(accessToken)

    const { exp: tokenExpiration } = jwt_decode(token);

    const expirationDate = addMinutes(new Date(tokenExpiration * 1000), -1)

    if (Date.now() >= expirationDate) {
        await refreshToken()
    }
}

export const authFetch = async (url = '', options = {}) => {

    await refreshExpiredToken()

    return fetch(backendUrl + url, addAuthHeader(options));
}
