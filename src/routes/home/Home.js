import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ExchangeWidgetPage from '../../components/ExchangeWidgetPage';

import s from './Home.scss';


class Home extends React.Component {

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Hello</h1>
            <ExchangeWidgetPage rates={this.props.rates} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
