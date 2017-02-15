import React from 'react';
import Field from '../Field';

export default Object.assign(Field.bind(null, ({ field, ...props }) => (
  <input
    className={field.className}
    type="text"
    value={field.value}
    {...props}
  />
)), Field);
