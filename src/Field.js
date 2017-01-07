/**
 * Field component
 */

import React, { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string.isRequired,
};

const contextTypes = {
  fields: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

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
