
export default function getCurrencySymbol(currencyAlias) {
    switch (currencyAlias) {
        case 'USD':
            return '$';
        case 'EUR':
            return '€';
        case 'RUB':
            return '₽';
        case 'GBP':
            return '£';
        default:
            return '';
    }
}
