import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import * as s from './Button.scss';

/**
 * Styled button component.
 */
class Button extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        onClick: PropTypes.func,
        // TODO enumerate all button types here
        type: PropTypes.string,
    };

    render() {
        return (
            <button
                className={classNames(this.props.className, s.button, s[this.props.type])}
                onClick={this.props.onClick}
            />
        );
    }
}

export default withStyles(s)(Button);
