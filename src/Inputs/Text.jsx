import React from 'react';
import createField from '../createField';

export default createField(({ field, className, ...props }) => (
  <input
    className={[field.className, className].join('\u{20}')}
    type="text"
    value={field.value}
    {...props}
  />
), 'text');
