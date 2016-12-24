/**
 * Created by MingYi on 2016/12/23.
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import FormControl from '../src';
import './BasicForm.scss';

const schemas = {
  email: {
    rules: 'required | isEmail | maxLength(32)',
    messages: '不能为空 | 请输入合法邮箱 | 不能超过 {{param}} 个字符',
  },
  phone: {
    rules: 'isPhone',
    messages: '手机号： {{value}} 不合法',
  },
  birthday: {
    rules: 'required | isDate',
    messages: '不能为空 | 请输入合法日期',
  },
  sex: {
    rules: 'required',
    messages: '不能为空',
  },
  city: {
    rules: 'required',
    messages: '不能为空',
  },
  hobby: {
    rules: 'required',
    messages: '不能为空',
  },
  remarks: {
    rules: 'minLength(10) | maxLength(60)',
    messages: '不能少于 {{param}} 个字符 | 不能超过 {{param}} 个字符',
  },
};

class BasicForm extends Component {

  static propTypes = {
    fields: PropTypes.object,
    onChange: PropTypes.func,
    validate: PropTypes.func,
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
      <div className="container">
        <h3>表单验证</h3>
        <div className="form-group">
          <label htmlFor="email">邮箱：</label>
          <input
            className={classNames('form-control', {
              'valid-error': fields.email.result === false,
              'valid-success': fields.email.result,
            })}
            id="email"
            name="email"
            type="email"
            onChange={onChange}
            value={fields.email.value}
            placeholder="请输入邮箱"
          />
          <em className="valid-error-message">{fields.email.message}</em>
        </div>
        <div className="form-group">
          <label htmlFor="phone">手机：</label>
          <input
            className="form-control"
            id="phone"
            name="phone"
            type="text"
            onChange={onChange}
            value={fields.phone.value}
            placeholder="请输入手机号"
          />
          <em className="valid-error-message">{fields.phone.message}</em>
        </div>
        <div className="form-group">
          <label htmlFor="birthday">生日：</label>
          <input
            className="form-control"
            id="birthday"
            name="birthday"
            type="text"
            onChange={onChange}
            value={fields.birthday.value}
            placeholder="请填写生日"
          />
          <em className="valid-error-message">{fields.birthday.message}</em>
        </div>
        <div className="form-group">
          <label htmlFor="male">性别：</label>
          <div className="radio">
            <label htmlFor="male">
              <input
                id="male"
                type="radio"
                name="sex"
                onChange={onChange}
                checked={fields.sex.value === '0'}
                value="0"
              />
              男
            </label>
            <label htmlFor="female">
              <input
                id="female"
                type="radio"
                name="sex"
                onChange={onChange}
                checked={fields.sex.value === '1'}
                value="1"
              />
              女
            </label>
          </div>
          <em className="valid-error-message">{fields.sex.message}</em>
        </div>
        <div className="form-group">
          <label htmlFor="city">城市：</label>
          <select
            className="form-control"
            id="city"
            name="city"
            onChange={onChange}
            value={fields.city.value}
          >
            <option value="">请选择</option>
            <option value="0">北京</option>
            <option value="1">上海</option>
            <option value="2">重庆</option>
            <option value="3">成都</option>
          </select>
          <em className="valid-error-message">{fields.city.message}</em>
        </div>
        <div className="form-group">
          <label htmlFor="hobby">爱好：</label>
          <div className="checkbox">
            <label htmlFor="hobby1">
              <input
                id="hobby1"
                name="hobby"
                type="checkbox"
                onChange={onChange}
                checked={fields.hobby.value.includes('1')}
                value="1"
              />
              羽毛球
            </label>
            <label htmlFor="hobby2">
              <input
                id="hobby2"
                name="hobby"
                type="checkbox"
                onChange={onChange}
                checked={fields.hobby.value.includes('2')}
                value="2"
              />
              游泳
            </label>
            <label htmlFor="hobby3">
              <input
                id="hobby3"
                name="hobby"
                type="checkbox"
                onChange={onChange}
                checked={fields.hobby.value.includes('3')}
                value="3"
              />
              跑步
            </label>
          </div>
          <em className="valid-error-message">{fields.hobby.message}</em>
        </div>

        <div className="form-group">
          <label htmlFor="remarks">简介：</label>
          <textarea
            className="form-control"
            id="remarks"
            name="remarks"
            rows="3"
            onChange={onChange}
            value={fields.remarks.value}
            placeholder="一句话描述自己"
          />
          <em className="valid-error-message">{fields.remarks.message}</em>
        </div>
        <input
          className={classNames('btn', {
            'btn-primary': !this.state.isValidate,
            'btn-success': this.state.isValidate,
          })}
          id="submit"
          type="button"
          onClick={this.handleSubmitClick}
          value={this.state.isValidate ? '验证通过' : '提交'}
        />
      </div>
    );
  }
}

export default FormControl(schemas)(BasicForm);
