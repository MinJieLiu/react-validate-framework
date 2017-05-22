import React from 'react';
import Field from '../Field';

const Radio = Field.bind(null, ({ field, value, ...props }) => (
  <input
    value={value}
    checked={field.value === value}
    {...props}
    type="radio"
  />
), 'radio');

export default Object.assign(Radio, Field);
