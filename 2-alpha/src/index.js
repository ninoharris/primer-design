// import _ from 'lodash'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Redux
import { Provider, connect } from 'react-redux'
import configureStore from './configureStore'

import App from './routers'

ReactDOM.render(
  <Provider store={configureStore}><App /></Provider>, 
  document.getElementById('root'));
registerServiceWorker();
