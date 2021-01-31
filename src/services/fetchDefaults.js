import { get } from 'svelte/store'
import { accessToken } from '../accessToken'
import { backendUrl } from '../constants';

const addAuthHeader = (options) => {
    const token = get(accessToken)

    options.headers = {
        ...options.headers,
        authorization: token ? `Bearer ${token}` : '',
    }

    return options
}

export const fetchDefaults = (url = '', options = {}) => {
    return fetch(backendUrl + url, addAuthHeader(options));
}
