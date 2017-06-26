import React from 'react';
import PropTypes from 'prop-types';

/**
 * Field component
 * @param FormComponent
 * @param fieldType - Input type
 * @param name
 * @param props - Other params
 * @param fields - ContextType
 * @param init - ContextType
 * @param onFormChange - ContextType
 * @constructor
 */
const Field = (FormComponent, fieldType, {
  name,
  ...props
}, {
  formControl: {
    fields,
    init,
    onFormChange,
  },
}) => {
  // Initialize field.
  if (!fields[name]) {
    // Checkbox uses an array
    init({
      [name]: fieldType === 'checkbox' ? [] : '',
    });
  }
  return (
    <FormComponent
      name={name}
      field={fields[name]}
      onChange={onFormChange}
      {...props}
    />
  );
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
};

Field.contextTypes = {
  formControl: PropTypes.object.isRequired,
};

export default Field;
