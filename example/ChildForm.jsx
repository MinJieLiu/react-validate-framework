/**
 * Created by MingYi on 2016/12/23.
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import FormControl from '../src';
import './ChildForm.scss';

const schemas = {
  money: {
    rules: 'required | isNumeric | maxLength(5)',
    messages: '不能为空 | 请输入整数金额 | 不能超过 {{param}} 个字符',
  },
  url: {
    rules: 'isUrl',
    messages: '请输入链接地址',
  },
};

class ChildForm extends Component {

  static propTypes = {
    fields: PropTypes.object,
    formValues: PropTypes.object,
    onChange: PropTypes.func,
    validate: PropTypes.func,
    validateByName: PropTypes.func,
  };

  state = {
    isValidate: false,
  };

  handleSubmitClick = () => {
    const { validate } = this.props;
    const isValidate = validate();
    this.setState({
      isValidate,
    });
  };

  render() {
    const {
      fields,
      onChange,
    } = this.props;

    return (
      <div className="child-form">
        <h3>子组件</h3>
        <div className="form-group">
          <label htmlFor="money">金额：</label>
          <input
            className={classNames('form-control', {
              'valid-error': fields.money.result === false,
              'valid-success': fields.money.result,
            })}
            id="money"
            name="money"
            type="money"
            onChange={onChange}
            value={fields.money.value}
            placeholder="请输入金额"
          />
          <em className="valid-error-message">{fields.money.message}</em>
        </div>
        <div className="form-group">
          <label htmlFor="url">网址：</label>
          <input
            className={classNames('form-control', {
              'valid-error': fields.url.result === false,
              'valid-success': fields.url.result,
            })}
            id="url"
            name="url"
            type="url"
            onChange={onChange}
            value={fields.url.value}
            placeholder="请输入网址"
          />
          <em className="valid-error-message">{fields.url.message}</em>
        </div>
        <input
          className={classNames('btn', {
            'btn-primary': !this.state.isValidate,
            'btn-success': this.state.isValidate,
          })}
          id="submit"
          type="button"
          onClick={this.handleSubmitClick}
          value={this.state.isValidate ? '验证通过' : '验证子组件'}
        />
      </div>
    );
  }
}

export default FormControl(schemas)(ChildForm);
