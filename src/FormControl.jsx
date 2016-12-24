/**
 * Created by MingYi on 2016/12/23.
 */

import React, { Component, PropTypes } from 'react';
import validator from 'validate-framework/lib/validate';

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
    validateField = ({ name, value }) => {
      // 验证
      const schema = {
        ...schemas[name],
        value,
      };
      return validator.validateByField(schema);
    };

    /**
     * 验证所有
     * @return {Object} fields
     */
    validateFields = () => {
      const { fields } = this.state;
      Object.keys(schemas).forEach((name) => {
        const schema = {
          ...schemas[name],
          value: fields[name].value,
        };
        const { result, error } = validator.validateByField(schema);
        Object.assign(fields[name], {
          result,
          message: error ? error.message : null,
        });
      });

      this.setState({
        fields,
      });
    };

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
      const { result, error } = this.validateField({ name, value });

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
