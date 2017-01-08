import React from 'react';
import Field from '../Field';

export default Object.assign(Field.bind(null, ({ field, value, ...props }) => (
  <input
    {...props}
    type="radio"
    value={value}
    checked={field.value === value}
  />
)), Field);
