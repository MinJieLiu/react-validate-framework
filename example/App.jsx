/**
 * Created by MingYi on 2016/12/23.
 */

import React, { Component } from 'react';
import './App.scss';
import BasicForm from './BasicForm';

export default class extends Component {

  state = {
    formValues: {
      sex: '1', // default
    },
    isAllValid: undefined,
  };

  // Validate the BasicForm
  handleValidateBasicForm = async () => {
    const isAllValid = await this.basicForm.validate();
    this.setState({
      isAllValid,
    });
  };

  // Change the form value
  handleChangeBasicForm = () => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        email: 'example@example.com',
        phone: '133333333333',
        hobby: ['1', '2'],
      },
    });
  };

  render() {
    return (
      <div className="app">
        <div className="jumbotron">
          <div className="container">
            <h1 className="title">react-validate-framework</h1>
            <h2 className="title">A lightweight and extensible React validation component</h2>
            <h3>
              <iframe
                src="https://ghbtns.com/github-btn.html?user=MinJieLiu&repo=react-validate-framework&type=star&count=true&size=large"
                frameBorder="0"
                scrolling="0"
                width="160px"
                height="30px"
              />
            </h3>
            <a href="https://github.com/MinJieLiu/react-validate-framework">
              <img
                className="fork-me"
                src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67"
                alt="Fork me on GitHub"
                data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"
              />
            </a>
          </div>
        </div>
        <div className="container">
          <h2>App component</h2>
          <button
            className="btn btn-info"
            onClick={this.handleValidateBasicForm}
          >
            Validate BasicForm
          </button>
          <button
            className="btn btn-default"
            onClick={this.handleChangeBasicForm}
          >
            Change the sub component form value
          </button>
          <div className="well-sm">
            <p>Status：{String(this.state.isAllValid)} （undefined | true | false）</p>
            <p>Basic Form values：{JSON.stringify(this.state.formValues)}</p>
          </div>
        </div>
        <BasicForm
          ref={(ref) => {
            this.basicForm = ref;
          }}
          classNames={{
            static: 'form-control',
            success: 'valid-success',
            error: 'valid-error',
          }}
          values={this.state.formValues}
        />
      </div>
    );
  }
}
