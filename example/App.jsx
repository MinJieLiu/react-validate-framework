/**
 * Created by MingYi on 2016/12/23.
 */

import React, { Component } from 'react';
import './App.scss';
import BasicForm from './BasicForm';

export default class extends Component {

  state = {
    formValues: {
      email: '',
      phone: '',
      birthday: '',
      sex: '',
      city: '',
      hobby: ['2'],
      remarks: '',
      money: '',
      url: '',
    },
    isAllValid: undefined,
  };

  // 验证子组件表单
  handleValidateBasicForm = () => {
    const basicForm = this.basicForm;
    // 验证
    const isAllValid = basicForm.handleValidate();
    let { formValues } = this.state;
    if (isAllValid) {
      // 获取表单值
      formValues = basicForm.formValues;
    }
    this.setState({
      isAllValid,
      formValues,
    });
  };

  render() {
    return (
      <div className="app">
        <div className="jumbotron">
          <div className="container">
            <h1 className="title">react-validate-framework</h1>
            <h2 className="title">简单、自由的 react 表单验证组件</h2>
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
          <h2>App 组件</h2>
          <button
            className="btn btn-info"
            onClick={this.handleValidateBasicForm}
          >
            验证子组件并打印
          </button>
          <div className="well-sm">
            <p>验证状态：{`${this.state.isAllValid}`} （undefined | true | false）</p>
            <p>Basic Form 表单值：{JSON.stringify(this.state.formValues)}</p>
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
