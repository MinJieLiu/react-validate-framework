import React, { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string.isRequired,
};

const contextTypes = {
  fields: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
};

/**
 * Field component
 * @param FormComponent
 * @param name
 * @param props
 * @param fields
 * @param onFormChange
 * @constructor
 */
const Field = (FormComponent, { name, ...props }, { fields, onFormChange }) => (
  <FormComponent
    name={name}
    field={fields[name]}
    onChange={onFormChange}
    {...props}
  />
);

Field.propTypes = propTypes;
Field.contextTypes = contextTypes;

export default Field;
