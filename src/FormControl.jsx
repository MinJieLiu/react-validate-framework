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
     * 组装数据
     * 此方法改变了状态，下个组件中集中更新 state
     * @param name
     * @param value
     */
    assembleFieldValidate(name, value) {
      const { fields } = this.state;
      // 验证
      // 无 schema 则不验证
      const schema = schemas[name] && Object.assign(schemas[name], { value });
      const { result, error } = schema ? this.validator.validateByField(schema) : {};

      // 组装
      Object.assign(fields[name], {
        value,
        result,
        message: error ? error.message : null,
      });
    }

    /**
     * 验证单个域
     * @param name
     * @param value
     * @return {Boolean}
     */
    validateField(name, value) {
      const { fields } = this.state;
      // 组装数据
      this.assembleFieldValidate(name, value);
      // 集中更新
      this.setState({
        fields,
      });

      return fields[name].result;
    }

    /**
     * 验证所有
     * @return {Object} fields
     */
    validateFields() {
      const { fields } = this.state;
      Object.keys(schemas).forEach((name) => {
        // 组装数据
        this.assembleFieldValidate(name, fields[name].value);
      });
      // 集中更新
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

      // 验证并更新
      this.validateField(name, theValue);

      // callback
      if (onChange) {
        onChange(e);
      }
    };

    /**
     * 通过 name 手动验证单个组件
     * @param name
     * @return {Boolean}
     */
    handleValidateByName = (name) => {
      const { fields } = this.state;
      const value = fields[name].value;
      return this.validateField(name, value);
    };

    // 验证当前组件
    handleValidate = () => {
      // 验证
      this.validateFields();
      const { fields } = this.state;
      // 排除 验证成功 和 未验证
      return Object.keys(fields).every(name => fields[name].result !== false);
    };

    render() {
      const { fields } = this.state;

      return (
        <FormComponent
          {...this.props}
          fields={fields}
          formValues={this.formValues}
          onChange={this.handleChange}
          validate={this.handleValidate}
          validateByName={this.handleValidateByName}
        />
      );
    }
  }
);
