import { parseString } from 'xml2js';
import config from '../../config';
import apiFetch from '../util/apiFetch';

export function loadExchangeRates() {
    return apiFetch(config.exchange.loadUrl).then((body) => {
        // Body is an xml. Gotta parse that.
        const finalRates = {};
        parseString(body, (err, result) => {
            const rates = result['gesmes:Envelope'].Cube[0].Cube[0].Cube;
            rates
                .filter((rate) => ['USD', 'RUB', 'GBP'].includes(rate['$'].currency))
                .forEach((rate) => {
                    finalRates[rate['$'].currency] = {
                        alias: rate['$'].currency,
                        rate: parseFloat(rate['$'].rate),
                    };
                });

            // Adding base currency
            finalRates.EUR = {
                alias: 'EUR',
                rate: 1,
            };
        });
        return finalRates;
    });
}



