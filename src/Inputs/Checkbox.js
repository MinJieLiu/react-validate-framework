import React from 'react';
import Field from '../Field';

export default Object.assign(Field.bind(null, ({ field, value, ...props }) => (
  <input
    {...props}
    type="checkbox"
    value={value}
    checked={field.value.indexOf(value) !== -1}
  />
)), Field);
