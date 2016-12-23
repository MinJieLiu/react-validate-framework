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

    handleChange = (e) => {
      const { name, value } = e.target;
      const { values, errors } = this.state;
      // 验证
      const field = fields[name] || {};
      field.value = value;
      const { result, error } = validator.validateByField(field);
      // 设置值
      this.setState({
        values: {
          ...values,
          [name]: value,
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
