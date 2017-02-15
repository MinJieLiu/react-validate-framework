/**
 * Created by MingYi on 2016/12/23.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.css';
import App from './App';

ReactDOM.render(
  <App />, // eslint-disable-line react/jsx-filename-extension
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
