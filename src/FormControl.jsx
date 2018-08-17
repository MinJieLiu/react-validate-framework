/**
 * A lightweight and extensible React validation component
 */

import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validate-framework-utils';
import debounce from 'lodash.debounce';
import isNumber from 'lodash.isnumber';

const ORIGINAL_VALUES = Symbol('#ORIGINAL_VALUES');
const ORIGINAL_CLASS_NAMES = Symbol('#ORIGINAL_CLASS_NAMES');

const GET_RESULT_FROM_SCHEMA = Symbol('#GET_RESULT_FROM_SCHEMA');
const ASSEMBLE_FIELD_FROM_RESULT = Symbol('#ASSEMBLE_FIELD_FROM_RESULT');

const ASSEMBLE_FIELD_CHANGE = Symbol('#ASSEMBLE_FIELD_CHANGE');
const ASYNC_ASSEMBLE_FIELD_CHANGE = Symbol('#ASYNC_ASSEMBLE_FIELD_CHANGE');

const ASSEMBLE_FIELD_VALIDATE = Symbol('#ASSEMBLE_FIELD_VALIDATE');
const ASYNC_ASSEMBLE_FIELD_VALIDATE = Symbol('#ASYNC_ASSEMBLE_FIELD_VALIDATE');

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

    schemas = { ...schemas };

    [ORIGINAL_VALUES] = {};

    [ORIGINAL_CLASS_NAMES] = {};

    constructor(props) {
      super(props);
      const {
        values,
        classNames,
      } = props;

      this.state = {
        fields: {},
      };

      if (classNames) {
        this.initClassNames(classNames);
      }
      if (values) {
        this.init(values);
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
              await this[ASYNC_ASSEMBLE_FIELD_CHANGE](name, value);
            }
          } else {
            // Add a new field
            fields[name] = {
              className: this[ORIGINAL_CLASS_NAMES].static,
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
          ...fields[name],
          className: this[ORIGINAL_CLASS_NAMES].static,
          value,
        };
        // Only initialized once
        if (this[ORIGINAL_VALUES][name] === undefined) {
          this[ORIGINAL_VALUES][name] = value;
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
      Object.assign(this[ORIGINAL_CLASS_NAMES], classes);
      return this;
    };

    /**
     * Create asynchronous validation
     * See createField.jsx
     * @param ms
     * @return {Function}
     */
    createDelayValidateFunc = (ms) => {
      const debounceValidateAndUpdate = async (...args) => {
        await this[ASYNC_ASSEMBLE_FIELD_VALIDATE](...args);
        this.forceUpdate();
      };
      return debounce(debounceValidateAndUpdate, ms);
    };

    [ASSEMBLE_FIELD_CHANGE] = (name, value) => {
      const { fields } = this.state;
      fields[name].value = value;
      // Async
      if (fields[name].delayFunc) {
        fields[name].delayFunc(name, value);
      } else {
        this[ASSEMBLE_FIELD_VALIDATE](name, value);
      }
    };

    [ASYNC_ASSEMBLE_FIELD_CHANGE] = async (name, value) => {
      this.state.fields[name].value = value;
      await this[ASYNC_ASSEMBLE_FIELD_VALIDATE](name, value);
    };

    [GET_RESULT_FROM_SCHEMA] = (name, value) => {
      const schema = this.schemas[name];
      return schema ? this.validator.validateField({ ...schema, name })(value) : {};
    };

    [ASSEMBLE_FIELD_FROM_RESULT] = (name, { result, error }) => {
      const classNames = this[ORIGINAL_CLASS_NAMES];
      const { fields } = this.state;

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
    };

    [ASSEMBLE_FIELD_VALIDATE] = (name, value) => {
      const resultField = this[GET_RESULT_FROM_SCHEMA](name, value);
      this[ASSEMBLE_FIELD_FROM_RESULT](name, resultField);
    };

    [ASYNC_ASSEMBLE_FIELD_VALIDATE] = async (name, value) => {
      const resultField = await this[GET_RESULT_FROM_SCHEMA](name, value);
      this[ASSEMBLE_FIELD_FROM_RESULT](name, resultField);
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
        if (fields[name]) {
          await this[ASYNC_ASSEMBLE_FIELD_VALIDATE](name, fields[name].value);

          // Exclude unauthenticated and validated successfully
          if (fields[name].result === false) {
            isValid = false;
          }
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
      this[ASSEMBLE_FIELD_CHANGE](name, theValue);
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
    changeValues = (values) => {
      const { fields } = this.state;
      // Initializes
      this.init(values);
      Object.keys(values).forEach((name) => {
        this[ASSEMBLE_FIELD_CHANGE](name, values[name]);
      });
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
          values[name] = this[ORIGINAL_VALUES][name];
        });
        this.init(values);
      } else {
        // Init all
        Object.assign(values, this[ORIGINAL_VALUES]);
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
