import React from 'react';
import Field from '../Field';

export default Object.assign(Field.bind(null, ({ field, value, ...props }) => (
  <input
    {...props}
    checked={field.value === value}
    value={value}
    type="radio"
  />
)), Field);
