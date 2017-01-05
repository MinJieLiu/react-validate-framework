/**
 * Input
 */

import React, { PropTypes } from 'react';
import Field from '../Field';

const contextTypes = {
  fields: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const Input = (...props) => Field(...props)(({ ...theProps }) => (
  <input
    type="text"
    {...theProps}
  />
));

Input.contextTypes = contextTypes;

export default Input;
