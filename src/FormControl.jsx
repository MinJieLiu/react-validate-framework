/**
 * Created by MingYi on 2016/12/23.
 */

import React, { Component, PropTypes } from 'react';
import Validator from 'validate-framework-utils';

/**
 * React form 验证组件
 * @param schemas
 * @return Component
 */
export default schemas => FormComponent => (

  /**
   * 验证组件
   */
  class FormControl extends Component {

    static propTypes = {
      values: PropTypes.object.isRequired,
      classNames: PropTypes.object,
    };

    static defaultProps = {
      classNames: {},
    };

    constructor(props) {
      super(props);
      const { classNames, values } = props;

      // 将初始化数据组装成 fields
      const fields = {};
      Object.keys(values).forEach((name) => {
        fields[name] = {
          className: classNames.static || '',
          value: values[name],
        };
      });

      this.state = {
        fields,
      };

      // 初始化验证组件并自定义验证方法
      this.validator = new Validator().addMethods(FormComponent.validator);
    }

    /**
     * 获取表单值列表
     * @return {Object}
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
      const { classNames } = this.props;
      const { fields } = this.state;
      // 验证
      // 无 schema 则不验证
      const schema = schemas[name] && Object.assign(schemas[name], { value });
      const { result, error } = schema ? this.validator.validateByField(schema) : {};
      // 组装类名
      // 验证成功和验证失败添加相应类
      const classNameArray = [
        classNames.static,
        result ? classNames.success : null,
        result === false ? classNames.error : null,
      ];
      // 组装
      Object.assign(fields[name], {
        value,
        className: classNameArray.filter(item => item).join('\u{20}'),
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
      return fields[name].result;
    }

    /**
     * 通过 names 验证组件
     * @param names
     * @return {Boolean}
     */
    validateByNames(...names) {
      const { fields } = this.state;
      let isValid = true;
      names.forEach((name) => {
        const result = this.validateField(name, fields[name].value);
        // 排除 未验证 和 验证成功
        if (result === false) {
          isValid = false;
        }
      });
      return isValid;
    }

    /**
     * 验证所有
     * @return {Boolean}
     */
    validateAllFields() {
      const names = Object.keys(schemas);
      return this.validateByNames(...names);
    }

    // 表单改变事件监听
    handleChange = (e) => {
      const { name, type, value } = e.target;
      const { fields } = this.state;

      // 依赖 name 属性
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

      // 验证
      this.validateField(name, theValue);

      // 更新
      this.setState({
        fields,
      });
    };

    /**
     * 添加一条或多条验证规则
     * @param schema
     */
    handleAddSchemas = (schema) => {
      Object.assign(schemas, schema);
    };

    /**
     * 删除一条或多条验证规则
     * @param names
     */
    handleRemoveSchemas = (names) => {
      names.forEach((name) => {
        delete schemas[name]; // eslint-disable-line no-param-reassign
      });
    };

    /**
     * 添加一条或多条域
     * @param newFields
     */
    handleAddFields = (newFields) => {
      const { classNames } = this.props;
      const { fields } = this.state;
      Object.keys(newFields).forEach((name) => {
        Object.assign(newFields[name], {
          className: classNames.static || '',
        });
      });
      // 组装
      Object.assign(fields, newFields);
      // 更新
      this.setState({
        fields,
      });
    };

    /**
     * 删除一条或多条域
     * @param names
     */
    handleRemoveFields = (names) => {
      const { fields } = this.state;
      names.forEach((name) => {
        delete fields[name];
      });
      // 更新
      this.setState({
        fields,
      });
    };

    /**
     * 通过 names 验证组件
     * @param names
     * @return {Boolean}
     */
    handleValidateByNames = (...names) => {
      const result = this.validateByNames(...names);
      const { fields } = this.state;
      // 更新
      this.setState({
        fields,
      });
      return result;
    };

    // 验证所有
    handleValidate = () => {
      // 验证
      const isAllValid = this.validateAllFields();
      const { fields } = this.state;
      // 更新
      this.setState({
        fields,
        isAllValid,
      });
      return isAllValid;
    };

    render() {
      const { fields, isAllValid } = this.state;

      return (
        <FormComponent
          {...this.props}
          fields={fields}
          isAllValid={isAllValid}
          formValues={this.formValues}
          onChange={this.handleChange}
          validate={this.handleValidate}
          validateByNames={this.handleValidateByNames}
          addFields={this.handleAddFields}
          removeFields={this.handleRemoveFields}
          addSchemas={this.handleAddSchemas}
          removeSchemas={this.handleRemoveSchemas}
        />
      );
    }
  }
);
