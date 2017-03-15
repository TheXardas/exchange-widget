import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';
import { loadExchangeRates } from '../../actions/exchange';

export default {

  path: '/',

  async action() {

    const rates = await loadExchangeRates();

    return {
      title: 'Application',
      component: <Layout><Home rates={rates} /></Layout>,
    };
  },

};
