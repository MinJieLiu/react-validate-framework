import React from 'react';
import PropTypes from 'prop-types';

/**
 * Field component
 * @param FormComponent
 * @param fieldType
 * @param name
 * @param props
 * @param fields
 * @param initField
 * @param onFormChange
 * @constructor
 */
const Field = (FormComponent, fieldType, {
  name,
  ...props
}, {
  fields,
  initField,
  onFormChange,
}) => {
  // Initialize field.
  if (!fields[name]) {
    // Checkbox uses an array
    initField({
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
  fields: PropTypes.object.isRequired,
  initField: PropTypes.func.isRequired,
  onFormChange: PropTypes.func.isRequired,
};

export default Field;
