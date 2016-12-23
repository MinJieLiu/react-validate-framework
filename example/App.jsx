/**
 * Created by MingYi on 2016/12/23.
 */

import React, { Component, PropTypes } from 'react';
import FormControl, { Input } from '../src';
import './styles.scss';

class App extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    values: PropTypes.object,
    errors: PropTypes.object,
  };

  render() {
    const { onChange, values, errors } = this.props;

    return (
      <div>
        <Input
          name="email"
          onChange={onChange}
          value={values.email}
        />
        <em>{errors.email}</em>
        <Input
          name="phone"
          onChange={onChange}
          value={values.phone}
        />
        <em>{errors.phone}</em>
      </div>
    );
  }
}

export default FormControl({
  email: {
    rules: 'required | isEmail | maxLength(32)',
    messages: '不能为空 | 请输入合法邮箱 | 不能超过 {{param}} 个字符',
  },
  phone: {
    rules: 'isPhone',
    messages: '手机号： {{value}} 不合法',
  },
})(App);
