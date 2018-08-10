import React from 'react';
import PropTypes from 'prop-types';

/**
 * Field component
 * @param FormComponent
 * @param fieldType
 * @constructor
 */
export default (FormComponent, fieldType) => class Field extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    delay: PropTypes.number,
  };

  static contextTypes = {
    formControl: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    const {
      formControl: {
        fields,
        init,
      },
    } = context;
    const { name, delay } = props;

    // Initialize field.
    if (!fields[name]) {
      // Checkbox uses an array
      init({
        [name]: fieldType === 'checkbox' ? [] : '',
      });
    }

    // delay
    if (delay) {
      fields[name].delay = delay;
    }
  }

  render() {
    const {
      name,
      delay, // eslint-disable-line
      ...props
    } = this.props;
    const { formControl } = this.context;

    return (
      <FormComponent
        name={name}
        field={formControl.fields[name]}
        onChange={formControl.onFormChange}
        {...props}
      />
    );
  }
};
