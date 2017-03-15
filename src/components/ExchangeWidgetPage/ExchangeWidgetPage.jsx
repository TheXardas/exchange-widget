import React from 'react';
import ExchangeWidget from '../ExchangeWidget';
import ErrorMessage from '../ErrorMessage';
import { loadExchangeRates } from '../../actions/exchange';
import config from '../../../config';
import { convert } from '../../util/exchange';

/**
 * Exchange widget page.
 * This component is an abstraction layer, demonstraiting interaction of ExchangeWidget with storage.
 * Basically - this component IS a storage.
 * In real application ExchangeWidget should be connected to storage with flux-way. Redux is one of the way.
 * But to save time, we will just use this component's state as the storage.
 */
export default class ExchangeWidgetPage extends React.Component {

    static updateRatesInterval;

    state = {
        isLoading: true,
        rates: null,

        fromCurrency: null,
        fromValue: 0,
        toCurrency: null,
        toValue: 0,
    };

    constructor(props) {
        super(props);
        if (props.rates) {
            this.state.rates = props.rates;
            this.state.fromCurrency = props.rates.EUR.alias;
            this.state.toCurrency = props.rates.USD.alias;
            this.state.isLoading = false;
        }
    }

    componentDidMount() {
        if (ExchangeWidgetPage.updateRatesInterval) {
            return;
        }
        ExchangeWidgetPage.updateRatesInterval = setInterval(
            this.updateExchangeRates,
            config.exchange.updateIntervalInSeconds * 100
        );
    }

    componentWillUnmount() {
        if (!ExchangeWidgetPage.updateRatesInterval) {
            return;
        }
        clearInterval(ExchangeWidgetPage.updateRatesInterval);
    }

    updateExchangeRates = () => {
        // TODO isLoading should be hidden in api layer and should be read from the store.
        this.setState({isLoading: true});

        const rates = loadExchangeRates().then((rates) => {
            this.setState({
                rates,
                isLoading: false,
                error: null,
                toValue: convert(rates, this.state.fromCurrency, this.state.fromValue, this.state.toCurrency),
            });
        }).catch((error) => {
            this.setState({
                error,
                isLoading: false,
            });
        });
    };

    onChange = ({fromCurrency, fromValue, toCurrency, toValue}) => {
        this.setState({
            fromCurrency,
            fromValue,
            toCurrency,
            toValue,
        });
    };

    renderError() {
        if (!this.state.error) {
            return;
        }

        return <ErrorMessage>{this.state.error}</ErrorMessage>
    }

    onSubmit = (operation) => {
        // TODO submit operation.
        console.log(operation);
    };

    render() {
        return (
            <div>
                <ExchangeWidget
                    isLoading={this.state.isLoading}
                    rates={this.state.rates}
                    fromCurrency={this.state.fromCurrency}
                    fromValue={this.state.fromValue}
                    toCurrency={this.state.toCurrency}
                    toValue={this.state.toValue}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                />
                {this.renderError()}
            </div>
        );
    }
}
