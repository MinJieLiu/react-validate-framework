/**
 * A lightweight and extensible React validation component
 */

import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validate-framework-utils';
import debounce from 'lodash.debounce';
import isNumber from 'lodash.isnumber';

/**
 * React validation component
 * @param schemas
 * @param methods Extended Validation Method
 */
export default (schemas, methods) => FormComponent => (

  /**
   * Returns a react form
   */
  class FormControl extends React.Component {

    static propTypes = {
      values: PropTypes.object,
      classNames: PropTypes.object,
    };

    static childContextTypes = {
      formControl: PropTypes.object.isRequired,
    };

    static defaultProps = {
      classNames: {},
    };

    schemas = { ...schemas };

    // Original
    originalValues = {};

    constructor(props) {
      super(props);
      const {
        classNames,
        values,
      } = props;

      this.state = {
        fields: {},
      };

      // Init
      if (values) {
        this.init(values, classNames);
      }

      // Initializes the validation component and customizes the validation method
      this.validator = new Validator();
      Object.assign(this.validator, methods, { fields: this.state.fields });
    }

    getChildContext() {
      return {
        formControl: this,
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

      (async () => {
        // eslint-disable-next-line no-restricted-syntax
        for (const name of Object.keys(values)) {
          const theValue = values[name];
          // Convert to string
          const value = isNumber(theValue) ? String(theValue) : theValue;
          // Validate the new data
          if (fields[name]) {
            // diff
            if (fields[name].value !== value) {
              await this.handleAssembleFieldChange(name, value);
            }
          } else {
            // Add a new field
            fields[name] = {
              className: classNames.static,
              value,
            };
          }
        }
        // Update
        this.setState({
          fields,
        });
      })();
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
      return Object
        .keys(this.schemas)
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
      if (classes) {
        this.initClassNames(classes);
      }
      // Initialize
      Object.keys(values).forEach((name) => {
        const theValue = values[name];
        // Convert to string
        const value = isNumber(theValue) ? String(theValue) : theValue;
        fields[name] = {
          className: this.props.classNames.static,
          value,
        };
        // Only initialized once
        if (this.originalValues[name] === undefined) {
          this.originalValues[name] = value;
        }
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
     * Create asynchronous validation
     * See createField.jsx
     * @param ms
     * @return {Function}
     */
    handleCreateDelayValidateFunc = (ms) => {
      const debounceValidateAndUpdate = async (...args) => {
        await this.handleAssembleFieldValidate(...args);
        this.forceUpdate();
      };
      return debounce(debounceValidateAndUpdate, ms);
    };

    /**
     * Assemble the data
     * This method is not operational
     * @param name
     * @param value
     * @return {FormControl}
     */
    handleAssembleFieldChange = async (name, value) => {
      const { fields } = this.state;
      fields[name].value = value;
      // Async
      if (fields[name].delayFunc) {
        fields[name].delayFunc(name, value);
      } else {
        await this.handleAssembleFieldValidate(name, value);
      }
    };

    /**
     * Validate the data
     * This method is not operational
     * @param name
     * @param value
     * @return {FormControl}
     */
    handleAssembleFieldValidate = async (name, value) => {
      const { classNames } = this.props;
      const { fields } = this.state;
      // No schema is not to validate
      const schema = this.schemas[name];
      const { result, error } = schema
        ? await this.validator.validateField(schema)(value)
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
    handleValidateField = async (name, value) => {
      const { fields } = this.state;
      // Assemble
      await this.handleAssembleFieldValidate(name, value);
      return fields[name].result;
    };

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
        const result = fields[name] && await this.handleValidateField(name, fields[name].value);
        // Exclude unauthenticated and validated successfully
        if (result === false) {
          isValid = false;
        }
      }
      return isValid;
    };

    // Form change event listener
    onFormChange = async (e) => {
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
      await this.handleAssembleFieldChange(name, theValue);
      // Update
      this.setState({
        fields,
      });
      this.formDidChange({ [name]: theValue });
    };

    /**
     * Customize to change the values
     * @param values
     */
    changeValues = async (values) => {
      const { fields } = this.state;
      // Initializes
      this.init(values);
      await Promise.all(
        Object.keys(values).map(name => this.handleAssembleFieldChange(name, values[name])),
      );
      // Update
      this.setState({
        fields,
      });
      this.formDidChange(values);
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
     * If there is no name, it will all be removed.
     * @param names
     */
    removeSchemas = (...names) => {
      if (names.length) {
        names.forEach((name) => {
          delete this.schemas[name];
        });
      } else {
        this.schemas = {};
      }
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
      this.formDidChange(values);
      return this;
    };

    /**
     * Deletes one or more fields
     * If there is no name, it will all be removed.
     * @param names
     */
    removeValues = (...names) => {
      const { fields } = this.state;
      if (names.length) {
        names.forEach((name) => {
          delete fields[name];
          if (this.props.values) {
            delete this.props.values[name];
          }
        });
      } else {
        // Remove all
        Object.keys(fields).forEach((name) => {
          delete this.state.fields[name];
          if (this.props.values) {
            delete this.props.values[name];
          }
        });
      }
      // Update
      this.setState({
        fields,
      });
      this.formDidChange({});
      return this;
    };

    /**
     * Reset one or more fields
     * If there is no name, it will all be init.
     * @param names
     */
    resetValues = (...names) => {
      const { fields } = this.state;
      const values = {};
      if (names.length) {
        names.forEach((name) => {
          values[name] = this.originalValues[name];
        });
        this.init(values);
      } else {
        // Init all
        Object.assign(values, this.originalValues);
        this.init(values);
      }
      // Update
      this.setState({
        fields,
      });
      this.formDidChange(values);
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

    /**
     * Validate all
     * @return {Boolean}
     */
    validate = () => this.validateByNames(...Object.keys(this.schemas));

    // After change
    formDidChange = () => {};

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
