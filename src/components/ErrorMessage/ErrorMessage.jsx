import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as s from './ErrorMessage.scss';

/**
 * Displays message in styled manner
 */
class ErrorMessage extends React.Component {

    render() {
        if (!this.props.children) {
            return null;
        }

        return (
            <span className={s.error}>{this.props.children}</span>
        );
    }
}

export default withStyles(s)(ErrorMessage);
