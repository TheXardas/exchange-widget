import fetch from './fetch';

export default function apiMiddleware(req, res, next) {
    const { method, path, query: queryParams, body } = req;

    if (method !== 'GET' && method !== 'POST' && method !== 'PUT' && method !== 'DELETE') {
        throw new Error(`Incompatible method: ${method}`);
    }

    return fetch(path.substr(1), queryParams).then(result => {
        res
            .status(result.status)
            .set('Content-type', 'text/plain')
            .send(result.text)
            .end();
    });
}
