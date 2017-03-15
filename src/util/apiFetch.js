import isBrowser from './isBrowser';
import fetch from './fetch';
import config from '../../config';

function getPath(url) {
    if (isBrowser()) {
        // If request is made within browser environment, we make request, to isomorphic middleware,
        // which will proxy request to real api from serverside.
        // This allows better control over api error handling, and resolves CORS issues splendidly.
        return config.api.xhrPath + url;
    }

    // На сервере проксируем запрос на настоящий api-хост.
    return url;
}

export default function apiFetch(url, query = {}) {
    return fetch(getPath(url), query).then((result) => {
        return result.text;
    });
}