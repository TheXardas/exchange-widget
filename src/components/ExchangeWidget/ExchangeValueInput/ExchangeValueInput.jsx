import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as s from './ExchangeValueInput.scss';

/**
 * Input, for entering currency exchange value
 */
class ExchangeValueInput extends React.Component {

    static propTypes = {
        value: PropTypes.number,
        onChange: PropTypes.func,
    };

    handleChange = (event) => {
        const value = parseInt(event.target.value, 10) || 0;
        this.props.onChange(value);
    };

    render() {
        return (
            <input
                className={s.input}
                type="number"
                value={this.props.value}
                onChange={this.handleChange}
            />
        );
    }
}

export default withStyles(s)(ExchangeValueInput);
