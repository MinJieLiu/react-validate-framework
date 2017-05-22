import React from 'react';
import Field from '../Field';

const Text = Field.bind(null, ({ field, className, ...props }) => (
  <input
    className={[field.className, className].join('\u{20}')}
    type="text"
    value={field.value}
    {...props}
  />
), 'text');

export default Object.assign(Text, Field);
