/**
 * Created by MingYi on 2016/12/23.
 */

import React, { Component, PropTypes } from 'react';
import validateFramework from 'validate-framework/lib/validate';

/**
 * 扩展必填验证方法，支持数组判断
 * @param field
 * @return {boolean}
 */
validateFramework.required = (field) => {
  if (typeof field === 'string') {
    return field !== '';
  } else if (Array.isArray(field.value)) {
    return field.value.length;
  }
  return field.value !== null && field.value !== '';
};

/**
 * 包装组件方法
 * @param schemas
 */
export default schemas => FormComponent => (

  /**
   * 验证组件
   */
  class FormControl extends Component {

    static propTypes = {
      values: PropTypes.object.isRequired,
      onChange: PropTypes.func,
    };

    constructor(props) {
      super(props);
      const values = props.values;

      // 将初始化数据组装成 fields
      const fields = {};
      Object.keys(values).forEach((name) => {
        fields[name] = {
          value: values[name],
        };
      });

      this.state = {
        fields,
      };

      // 自定义验证方法
      Object.assign(validateFramework, FormComponent.validator);
      this.validator = {
        ...validateFramework,
      };
    }

    componentWillReceiveProps(nextProps) {
      const { values } = nextProps;
      const { fields } = this.state;
      Object.keys(values).forEach((name) => {
        fields[name] = {
          ...fields[name],
          value: values[name],
        };
      });
      this.setState({
        fields,
      });
    }

    /**
     * 获取表单值列表
     * @return {{}}
     */
    get formValues() {
      const { fields } = this.state;
      const values = {};
      Object.keys(fields).forEach((name) => {
        values[name] = fields[name].value;
      });
      return values;
    }

    /**
     * 验证单个域
     * @param name
     * @param value
     * @return {*}
     */
    validateField(name, value) {
      // 验证
      const schema = {
        ...schemas[name],
        value,
      };
      return this.validator.validateByField(schema);
    }

    /**
     * 验证所有
     * @return {Object} fields
     */
    validateFields() {
      const { fields } = this.state;
      Object.keys(schemas).forEach((name) => {
        const schema = {
          ...schemas[name],
          value: fields[name].value,
        };
        const { result, error } = this.validator.validateByField(schema);
        Object.assign(fields[name], {
          result,
          message: error ? error.message : null,
        });
      });

      this.setState({
        fields,
      });
    }

    handleChange = (e) => {
      const { name, type, value } = e.target;
      const { onChange } = this.props;
      const { fields } = this.state;

      // 无 name 值
      if (!name) {
        return;
      }

      let theValue;
      // checkbox 处理
      if (type === 'checkbox') {
        theValue = fields[name].value.slice();
        const index = theValue.findIndex(item => item === value);
        if (index === -1) {
          theValue.push(value);
        } else {
          theValue.splice(index, 1);
        }
      } else {
        theValue = value;
      }

      // 验证并获得结果
      const { result, error } = this.validateField(name, theValue);

      // 设置值
      this.setState({
        fields: {
          ...fields,
          [name]: {
            value: theValue,
            result,
            message: error ? error.message : null,
          },
        },
      });

      // callback
      if (onChange) {
        onChange(e);
      }
    };

    // 验证当前组件
    handleValidate = () => {
      // 验证
      this.validateFields();
      const { fields } = this.state;
      return Object.keys(fields).every(name => fields[name].result === true);
    };

    render() {
      const { fields } = this.state;

      return (
        <FormComponent
          {...this.props}
          fields={fields}
          onChange={this.handleChange}
          validate={this.handleValidate}
          formValues={this.formValues}
        />
      );
    }
  }
);
