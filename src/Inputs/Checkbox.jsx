import React from 'react';
import Field from '../Field';

const Checkbox = Field.bind(null, ({ field, value, ...props }) => (
  <input
    value={value}
    checked={field.value.indexOf(value) !== -1}
    {...props}
    type="checkbox"
  />
), 'checkbox');

export default Object.assign(Checkbox, Field);
