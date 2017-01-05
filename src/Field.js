/**
 * Input component
 */

import React, { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string.isRequired,
};

/**
 * Return input component
 * @param name
 * @param props
 * @param fields
 * @param handleChange
 * @constructor
 */
const Field = ({ name, ...props }, { fields, handleChange }) => InputComponent => (
  <InputComponent
    className={fields[name].className}
    name={name}
    value={fields[name].value}
    onChange={handleChange}
    {...props}
  />
);

Field.propTypes = propTypes;

export default Field;
