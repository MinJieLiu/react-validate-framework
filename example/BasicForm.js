/**
 * Created by MingYi on 2016/12/23.
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import FormControl from '../src';
import './BasicForm.scss';

const fields = {
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
    onChange: PropTypes.func,
    values: PropTypes.object,
    errors: PropTypes.object,
  };

  render() {
    const {
      onChange,
      values,
      errors,
    } = this.props;

    const formControlCls = classNames('form-control', {
      'valid-error': false,
      'valid-success': false,
    });

    return (
      <div className="container">
        <h3>表单验证</h3>
        <div className="form-group">
          <label htmlFor="email">邮箱：</label>
          <input
            className={formControlCls}
            id="email"
            name="email"
            type="email"
            onChange={onChange}
            value={values.email}
            placeholder="请输入邮箱"
          />
          <em className="valid-error-message">{errors.email}</em>
        </div>
        <div className="form-group">
          <label htmlFor="phone">手机：</label>
          <input
            className="form-control"
            id="phone"
            name="phone"
            type="text"
            onChange={onChange}
            value={values.phone}
            placeholder="请输入手机号"
          />
          <em className="valid-error-message">{errors.phone}</em>
        </div>
        <div className="form-group">
          <label htmlFor="birthday">生日：</label>
          <input
            className="form-control"
            id="birthday"
            name="birthday"
            type="text"
            onChange={onChange}
            value={values.birthday}
            placeholder="请填写生日"
          />
          <em className="valid-error-message">{errors.birthday}</em>
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
                value="1"
              />
              女
            </label>
          </div>
          <em className="valid-error-message">{errors.sex}</em>
        </div>
        <div className="form-group">
          <label htmlFor="city">城市：</label>
          <select
            className="form-control"
            id="city"
            name="city"
            onChange={onChange}
            value={values.city}
          >
            <option value="">请选择</option>
            <option value="0">北京</option>
            <option value="1">上海</option>
            <option value="2">重庆</option>
            <option value="3">成都</option>
          </select>
          <em className="valid-error-message">{errors.city}</em>
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
                value="3"
              />
              跑步
            </label>
          </div>
          <em className="valid-error-message">{errors.hobby}</em>
        </div>

        <div className="form-group">
          <label htmlFor="remarks">简介：</label>
          <textarea
            className="form-control"
            id="remarks"
            name="remarks"
            rows="3"
            onChange={onChange}
            value={values.remarks}
            placeholder="一句话描述自己"
          />
          <em className="valid-error-message">{errors.remarks}</em>
        </div>
        <input
          className="btn btn-primary"
          id="submit"
          type="submit"
          value="提交"
        />
      </div>
    );
  }
}

export default FormControl(fields)(BasicForm);
