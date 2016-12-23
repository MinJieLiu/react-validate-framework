/**
 * Created by MingYi on 2016/12/23.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <App
    initValues={{
      email: '',
      phone: '',
    }}
  />,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
