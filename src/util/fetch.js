import request from 'superagent';

export default function fetch(url, query = {}) {
    return new Promise((resolve, reject) => {
        request
            .get(url)
            .query(query)
            .end((err, res) => {
                if (err) {
                    return reject(err);
                }

                return resolve(res);
            });
    });
}
