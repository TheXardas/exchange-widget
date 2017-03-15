import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import * as s from './ExchangeWidget.scss';
import SingleCurrencyPanel from './SingleCurrencyPanel';
import CurrencyRate from './CurrencyRate';
import Button from '../Button';
import { convert } from '../../util/exchange';

/**
 * Main widget, for controlling exchange operation
 */
class ExchangeWidget extends React.Component {

    static propTypes = {
        isLoading: PropTypes.bool,
        rates: PropTypes.object,
        fromCurrency: PropTypes.string,
        fromValue: PropTypes.number,
        toCurrency: PropTypes.string,
        toValue: PropTypes.number,
        onChange: PropTypes.func,
        onSubmit: PropTypes.func,
    };

    handleChange = (fromCurrency, fromValue, toCurrency, toValue) => {
        this.props.onChange({
            fromCurrency,
            fromValue,
            toCurrency,
            toValue,
        })
    };

    handleCurrencyFromChange = (newCurrency) => {
        const convertedValue = convert(this.props.rates, newCurrency, this.props.fromValue, this.props.toCurrency);
        this.handleChange(newCurrency, this.props.fromValue, this.props.toCurrency, convertedValue);
    };

    handleCurrencyToChange = (newCurrency) => {
        const convertedValue = convert(this.props.rates, this.props.fromCurrency, this.props.fromValue, newCurrency);
        this.handleChange(this.props.fromCurrency, this.props.fromValue, newCurrency, convertedValue);
    };

    handleValueFromChange = (newValue) => {
        const convertedValue = convert(this.props.rates, this.props.fromCurrency, newValue, this.props.toCurrency);
        this.handleChange(this.props.fromCurrency, newValue, this.props.toCurrency, convertedValue);
    };

    handleValueToChange = (newValue) => {
        const convertedValue = convert(this.props.rates, this.props.toCurrency, newValue, this.props.fromCurrency);
        this.handleChange(this.props.fromCurrency, convertedValue, this.props.toCurrency, newValue);
    };

    handleSubmit = () => {
        const operation = {
            fromCurrency: this.props.fromCurrency,
            toCurrency: this.props.toCurrency,
            fromValue: this.props.fromValue,
            toValue: this.props.toValue,
        };

        this.props.onSubmit(operation);
    };


    render() {
        return (
            <div className={classNames(s.wrapper, {
                [s.loading]: this.props.isLoading,
            })}>
                <SingleCurrencyPanel
                    rates={this.props.rates}
                    currency={this.props.fromCurrency}
                    value={this.props.fromValue}
                    onCurrencyChange={this.handleCurrencyFromChange}
                    onValueChange={this.handleValueFromChange}
                />
                <SingleCurrencyPanel
                    rates={this.props.rates}
                    currency={this.props.toCurrency}
                    value={this.props.toValue}
                    onCurrencyChange={this.handleCurrencyToChange}
                    onValueChange={this.handleValueToChange}
                />
                <CurrencyRate
                    isLoading={this.props.isLoading}
                    rates={this.props.rates}
                    fromCurrency={this.props.fromCurrency}
                    toCurrency={this.props.toCurrency}
                />
                <Button
                    title="Submit exchange"
                    className={s.submitButton}
                    type="submit"
                    onClick={this.handleSubmit}
                />
            </div>
        );
    }
}

export default withStyles(s)(ExchangeWidget);
