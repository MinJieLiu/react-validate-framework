/**
 * Created by MingYi on 2016/12/23.
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import FormControl from '../src';
import './BasicForm.scss';
import ChildForm from './ChildForm';

// 验证规则
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
    rules: 'required | selectLimit(3)',
    messages: '不能为空 | 至少选择 {{param}} 项',
  },
  remarks: {
    rules: 'minLength(10) | maxLength(60)',
    messages: '不能少于 {{param}} 个字符 | 不能超过 {{param}} 个字符',
  },
  money: {
    rules: 'required | isNumeric | maxLength(5)',
    messages: '不能为空 | 请输入整数金额 | 不能超过 {{param}} 个字符',
  },
  url: {
    rules: 'isUrl',
    messages: '请输入链接地址',
  },
};

// 自定义扩展验证方法
const methods = {
  selectLimit(field, param) {
    if (Array.isArray(field.value)) {
      return field.value.length >= param;
    }
    return false;
  },
};

class BasicForm extends Component {

  static propTypes = {
    fields: PropTypes.object,
    formValues: PropTypes.object,
    isAllValid: PropTypes.bool,
    onChange: PropTypes.func,
    validate: PropTypes.func,
    validateByNames: PropTypes.func,
  };

  /**
   * 删除验证规则
   * @param name
   */
  handleRemoveSchema = (name) => {
    const { validateByNames } = this.props;
    delete schemas[name];
    // 手动验证
    validateByNames(name);
  };

  handleSubmitClick = () => {
    const { validate } = this.props;
    // 验证本组件
    // @return {Boolean}
    validate();
  };

  render() {
    const {
      fields,
      onChange,
      formValues,
      isAllValid,
    } = this.props;

    return (
      <div className="container">
        <h3>BasicForm 组件</h3>
        <div className="form-group">
          <label htmlFor="email">邮箱：</label>
          <input
            className={fields.email.className}
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
          <button
            className="btn btn-default"
            type="button"
            onClick={() => {
              this.handleRemoveSchema('email');
            }}
          >
            不验证邮箱
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="phone">手机：</label>
          <input
            className={fields.phone.className}
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
            className={fields.birthday.className}
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
            className={fields.city.className}
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
            <label htmlFor="hobby4">
              <input
                id="hobby4"
                name="hobby"
                type="checkbox"
                onChange={onChange}
                checked={fields.hobby.value.includes('4')}
                value="4"
              />
              游戏
            </label>
          </div>
          <em className="valid-error-message">{fields.hobby.message}</em>
        </div>
        <div className="form-group">
          <label htmlFor="remarks">简介：</label>
          <textarea
            className={fields.remarks.className}
            id="remarks"
            name="remarks"
            rows="3"
            onChange={onChange}
            value={fields.remarks.value}
            placeholder="一句话描述自己"
          />
          <em className="valid-error-message">{fields.remarks.message}</em>
        </div>
        <ChildForm {...this.props} />
        <input
          className={classNames('btn', {
            'btn-primary': !isAllValid,
            'btn-success': isAllValid,
          })}
          id="submit"
          type="button"
          onClick={this.handleSubmitClick}
          value={isAllValid ? '验证通过' : '提交'}
        />
        <div className="well-sm">
          <p>表单值：</p>
          {JSON.stringify(formValues)}
        </div>
      </div>
    );
  }
}

export default FormControl(schemas, methods)(BasicForm);
