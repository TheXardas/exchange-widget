import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as s from './SingleCurrencyPanel.scss';
import ExchangeValueInput from '../ExchangeValueInput';
import Button from '../../Button';

/**
 * Panel, displaying input or output of money conversion
 */
class SingleCurrencyPanel extends React.Component {

    static propTypes = {
        rates: PropTypes.object,
        currency: PropTypes.string,
        value: PropTypes.number,
        onCurrencyChange: PropTypes.func,
        onValueChange: PropTypes.func,
    };

    setPreviousCurrency = () => {
        const currencyAliases = Object.keys(this.props.rates);
        const currentCurrencyIndex = currencyAliases.indexOf(this.props.currency.alias);
        let newCurrencyIndex = 0;
        if (currencyAliases.length - 1 !== currentCurrencyIndex) {
            newCurrencyIndex = currentCurrencyIndex + 1;
        }
        const newCurrency = currencyAliases[newCurrencyIndex];
        this.changeCurrency(newCurrency);
    };

    setNextCurrency = () => {
        const currencyAliases = Object.keys(this.props.rates);
        const currentCurrencyIndex = currencyAliases.indexOf(this.props.currency);
        let newCurrencyIndex = currencyAliases.length - 1;
        if (0 !== currentCurrencyIndex) {
            newCurrencyIndex = currentCurrencyIndex - 1;
        }
        const newCurrency = currencyAliases[newCurrencyIndex];
        this.changeCurrency(newCurrency);
    };

    changeCurrency = (newCurrency) => {
        this.props.onCurrencyChange(newCurrency);
    };

    render() {
        return (
            <div className={s.wrapper}>
                <Button title="Previous currency" type="prev" onClick={this.setPreviousCurrency} />
                <span className={s.currency}>{this.props.currency}</span>
                <ExchangeValueInput
                    value={this.props.value}
                    onChange={this.props.onValueChange}
                />
                <Button title="Next currency" type="next" onClick={this.setNextCurrency} />
            </div>
        );
    }
}

export default withStyles(s)(SingleCurrencyPanel);
