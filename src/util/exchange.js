

export function convert(rates, fromCurrency, fromValue, toCurrency, cutDecimals = true) {
    const fromBaseRate = rates[fromCurrency].rate;
    const toBaseRate = rates[toCurrency].rate;
    const finalRate = toBaseRate / fromBaseRate;
    // We should have only 2 decimals at the end.
    // "+" sign truncates extra zeros at the end.
    let result = fromValue * finalRate;
    if (cutDecimals) {
        result = +(result).toFixed(2);
    }
    return result;
}
