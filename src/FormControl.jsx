/**
 * A lightweight and extensible React validation component
 */

import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validate-framework-utils';
import debounce from 'lodash/debounce';

/**
 * React validation component
 * @param schemas
 * @param methods Extended Validation Method
 * @return Component
 */
export default (schemas, methods) => FormComponent => (

  /**
   * Returns a react form
   */
  class FormControl extends React.Component {

    static propTypes = {
      values: PropTypes.object,
      classNames: PropTypes.object,
      delay: PropTypes.number,
    };

    static childContextTypes = {
      fields: PropTypes.object.isRequired,
      initField: PropTypes.func.isRequired,
      onFormChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
      classNames: {},
      delay: 0,
    };

    schemas = Object.assign({}, schemas);

    constructor(props) {
      super(props);
      const {
        classNames,
        values,
        delay,
      } = props;

      if (delay) {
        this.delayValidateField = debounce(this.delayValidateField.bind(this), delay);
      }

      const fields = {};
      // Assemble the initialization data into fields
      if (values) {
        Object.keys(values).forEach((name) => {
          fields[name] = {
            className: classNames.static,
            value: values[name],
          };
        });
      }

      this.state = {
        fields,
      };

      // Initializes the validation component and customizes the validation method
      this.validator = new Validator();
      Object.assign(this.validator, methods, {
        fields,
      });
    }

    getChildContext() {
      return {
        fields: this.state.fields,
        initField: this.init,
        onFormChange: this.onFormChange,
      };
    }

    componentWillReceiveProps(nextProps) {
      const { values } = nextProps;
      // No value
      if (!values) {
        return;
      }
      // Updates the state from the parent component
      const { classNames } = this.props;
      const { fields } = this.state;

      Object.keys(values).forEach((name) => {
        const newValue = values[name];
        // Validate the new data
        if (fields[name]) {
          // diff
          if (fields[name].value !== newValue) {
            this.assembleFieldChange(name, newValue)
              .delayValidateField(name, newValue);
          }
        } else {
          // Add a new field
          fields[name] = {
            className: classNames.static,
            value: newValue,
          };
        }
      });

      this.setState({
        fields,
      });
    }

    /**
     * Get the fields object
     * @returns {Object}
     */
    get fields() {
      return this.state.fields;
    }

    /**
     * Gets a list of form values
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
     * Gets the global validation status
     * @return {Boolean}
     */
    get isAllValid() {
      const { fields } = this.state;
      return Object.keys(this.schemas)
        .every(name => fields[name] && fields[name].result);
    }

    /**
     * Initializes the form value and classes
     * @param values
     * @param classes
     */
    init = (values, classes) => {
      const { fields } = this.state;
      // Assign classNames
      this.initClassNames(classes);
      // Initialize
      Object.keys(values).forEach((name) => {
        const value = values[name];
        fields[name] = {
          className: this.props.classNames.static,
          value,
        };
        // Synchronize values external state
        if (this.props.values) {
          this.props.values[name] = value;
        }
      });
      return this;
    };

    /**
     * Init classNames
     * @param classes
     */
    initClassNames = (classes) => {
      // Merge
      Object.assign(this.props.classNames, classes);
      return this;
    };

    /**
     * Assemble the data
     * This method is not operational
     * @param name
     * @param value
     * @return {FormControl}
     */
    assembleFieldChange = (name, value) => {
      Object.assign(this.state.fields[name], {
        value,
      });
      return this;
    };

    /**
     * Validate the data
     * This method is not operational
     * @param name
     * @param value
     * @return {FormControl}
     */
    assembleFieldValidate = async (name, value) => {
      const { classNames } = this.props;
      const { fields } = this.state;
      // No schema is not to validate
      const schema = this.schemas[name] && Object.assign(this.schemas[name], { value });
      const { result, error } = schema
        ? await this.validator.validateByField(schema)
        : {};
      // Assembly class name
      // Validation success and validation failure Add the appropriate class
      const classNameArray = [
        classNames.static,
        result ? classNames.success : null,
        result === false ? classNames.error : null,
      ];
      // Assemble
      Object.assign(fields[name], {
        className: classNameArray.filter(item => item).join('\u{20}'),
        result,
        message: error ? error.message : undefined,
      });
      return this;
    };

    /**
     * Validate a single field
     * @param name
     * @param value
     * @return {Boolean}
     */
    validateField = async (name, value) => {
      const { fields } = this.state;
      // Assemble
      await this.assembleFieldValidate(name, value);
      return fields[name].result;
    };

    /**
     * DelayValidateField
     * @param name
     * @param value
     */
    async delayValidateField(name, value) {
      const { fields } = this.state;
      // Assemble
      await this.assembleFieldValidate(name, value);
      this.setState({
        fields,
      });
      return this;
    }

    /**
     * Validate fields by names
     * @param names
     * @return {Boolean}
     */
    validateFieldsByNames = async (...names) => {
      const { fields } = this.state;
      let isValid = true;
      // eslint-disable-next-line no-restricted-syntax
      for (const name of names) {
        const result = fields[name] && await this.validateField(name, fields[name].value);
        // Exclude unauthenticated and validated successfully
        if (result === false) {
          isValid = false;
        }
      }
      return isValid;
    };

    // Form change event listener
    onFormChange = (e) => {
      const { name, type, value } = e.target;
      const { fields } = this.state;

      // Dependent on the name attribute
      if (!name) {
        return;
      }

      let theValue;
      // Checkbox processing
      if (type === 'checkbox') {
        theValue = fields[name].value.slice();
        const index = theValue.indexOf(value);
        if (index === -1) {
          theValue.push(value);
        } else {
          theValue.splice(index, 1);
        }
      } else {
        theValue = value;
      }
      // Synchronize values external state
      if (this.props.values) {
        this.props.values[name] = theValue;
      }
      // Assemble and delay validate
      this.assembleFieldChange(name, theValue).delayValidateField(name, theValue);
      // Update
      this.setState({
        fields,
      });
      this.formDidChange();
    };

    /**
     * Customize to change the values
     * @param values
     */
    changeValues = (values) => {
      const { fields } = this.state;
      // Initializes
      this.init(values);
      Object.keys(values).forEach(name => this.assembleFieldChange(name, values[name])
        .delayValidateField(name, values[name]));
      // Update
      this.setState({
        fields,
      });
      this.formDidChange();
      return this;
    };

    /**
     * Add one or more validation rules
     * @param schema
     */
    addSchemas = (schema) => {
      Object.assign(this.schemas, schema);
      return this;
    };

    /**
     * Delete one or more validation rules
     * @param names
     */
    removeSchemas = (...names) => {
      names.forEach((name) => {
        delete this.schemas[name];
      });
      // Validate the deleted status
      this.validateByNames(...names);
      return this;
    };

    /**
     * Add one or more fields
     * @param values
     */
    addValues = (values) => {
      const { fields } = this.state;
      // Initializes
      this.init(values);
      // Update
      this.setState({
        fields,
      });
      this.formDidChange();
      return this;
    };

    /**
     * Deletes one or more fields
     * @param names
     */
    removeValues = (...names) => {
      const { fields } = this.state;
      names.forEach((name) => {
        delete fields[name];
      });
      // Update
      this.setState({
        fields,
      });
      this.formDidChange();
      return this;
    };

    /**
     * Validate the component through names
     * @param names
     * @return {Boolean}
     */
    validateByNames = async (...names) => {
      const result = await this.validateFieldsByNames(...names);
      const { fields } = this.state;
      // Update
      this.setState({
        fields,
      });
      return result;
    };

    // Validate all
    validate = () => {
      const names = Object.keys(this.schemas);
      return this.validateByNames(...names);
    };

    // After change
    formDidChange = () => {
    };

    render() {
      return (
        <FormComponent
          {...this.props}
          formControl={this}
        />
      );
    }
  }
);
