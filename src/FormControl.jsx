/**
 * Created by MingYi on 2016/12/23.
 */

import React, { Component, PropTypes } from 'react';
import validator from 'validate-framework/lib/validate';

export default fields => FormComponent => (
  class FormControl extends Component {
    static propTypes = {
      initValues: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        values: props.initValues,
        errors: {},
      };
    }

    /**
     * 验证单个 field
     * @param name
     * @param value
     * @return {*}
     */
    validateField = ({ name, value }) => {
      // 验证
      const field = fields[name] || {};
      field.value = value;
      return validator.validateByField(field);
    };

    handleChange = (e) => {
      const { name, type, value } = e.target;
      const { values, errors } = this.state;
      // 无 name 值
      if (!name) {
        return;
      }
      let theValue;
      // checkbox 处理
      if (type === 'checkbox') {
        theValue = this.state.values[name].slice();
        const index = theValue.indexOf(value);
        if (index === -1) {
          theValue.push(value);
        } else {
          theValue.splice(index, 1);
        }
      } else {
        theValue = value;
      }
      // 验证并获得结果
      const { result, error } = this.validateField({ name, value });
      // 设置值
      this.setState({
        values: {
          ...values,
          [name]: theValue,
        },
        // 验证结果正确则清空错误信息
        errors: {
          ...errors,
          [name]: result ? null : error.message,
        },
      });
    };

    render() {
      const { values, errors } = this.state;

      return (
        <FormComponent
          {...this.props}
          onChange={this.handleChange}
          values={values}
          errors={errors}
        />
      );
    }
  }
);
