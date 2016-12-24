/**
 * Created by MingYi on 2016/12/23.
 */

import React from 'react';
import './App.scss';
import BasicForm from './BasicForm';

const App = () => (
  <div className="app">
    <div className="jumbotron">
      <div className="container">
        <h1 className="title">react-validate-framework</h1>
        <h2 className="title">一款轻量、强大、无依赖、前后端通用的 JavaScript 验证组件</h2>
        <h3>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=MinJieLiu&repo=react-validate-framework&type=star&count=true&size=large"
            frameBorder="0"
            scrolling="0"
            width="160px"
            height="30px"
          />
        </h3>
        <a
          href="https://github.com/MinJieLiu/react-validate-framework"
        >
          <img
            className="fork-me"
            src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67"
            alt="Fork me on GitHub"
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"
          />
        </a>
      </div>
    </div>
    <BasicForm
      values={{
        email: '',
        phone: '',
        birthday: '',
        sex: '',
        city: '',
        hobby: ['2'],
        remarks: '',
      }}
    />
  </div>
);

export default App;
