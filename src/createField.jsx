import React from 'react';
import PropTypes from 'prop-types';

/**
 * Field component
 * @param FormComponent
 * @param fieldType
 * @constructor
 */
export default (FormComponent, fieldType) => class Field extends React.Component { // eslint-disable-line

  static propTypes = {
    name: PropTypes.string.isRequired,
    delay: PropTypes.number,
  };

  static contextTypes = {
    formControl: PropTypes.object.isRequired,
  };

  render() {
    const {
      name,
      delay, // eslint-disable-line
      ...props
    } = this.props;
    const {
      formControl: {
        fields,
        init,
        createDelayValidateFunc,
        onFormChange,
      },
    } = this.context;

    // Initialize field.
    if (!fields[name]) {
      // Checkbox uses an array
      init({
        [name]: fieldType === 'checkbox' ? [] : '',
      });
    }

    // Async
    if (delay && !fields[name].delayFunc) {
      fields[name].delayFunc = createDelayValidateFunc(delay);
    }

    return (
      <FormComponent
        name={name}
        field={fields[name]}
        onChange={onFormChange}
        {...props}
      />
    );
  }
};
