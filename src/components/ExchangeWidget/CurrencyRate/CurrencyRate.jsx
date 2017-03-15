import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import * as s from './CurrencyRate.scss';
import getCurrencySymbol from '../../../util/getCurrencySymbol';
import { convert } from '../../../util/exchange';
import Button from '../../Button';

/**
 * Displays human-readable rate of currency conversion
 */
class CurrencyRate extends React.Component {

    static propTypes = {
        isLoading: PropTypes.bool,
        rates: PropTypes.object,
        fromCurrency: PropTypes.string,
        toCurrency: PropTypes.string,
    };


    getRate(fromCurrency, toCurrency) {
        const result = convert(this.props.rates, fromCurrency, 1, toCurrency, false);
        return `1 ${getCurrencySymbol(fromCurrency)} = ${result} ${getCurrencySymbol(toCurrency)}`;
    }

    render() {
        return (
            <div className={s.wrapper} title="Conversion rate">
                <span className={s.rate}>{this.getRate(this.props.fromCurrency, this.props.toCurrency)}</span>
                <Button className={classNames(s.loader, {[s.invisible]: !this.props.isLoading})} type="loading" />
            </div>
        );
    }
}

export default withStyles(s)(CurrencyRate);
