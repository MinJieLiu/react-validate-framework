import React, { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string.isRequired,
};

const contextTypes = {
  fields: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

/**
 * Field component
 * @param FormComponent
 * @param name
 * @param props
 * @param fields
 * @param handleChange
 * @constructor
 */
const Field = (FormComponent, { name, ...props }, { fields, handleChange }) => (
  <FormComponent
    name={name}
    field={fields[name]}
    onChange={handleChange}
    {...props}
  />
);

Field.propTypes = propTypes;
Field.contextTypes = contextTypes;

export default Field;
