import React from 'react';
import createField from '../createField';

export default createField(({ field, value, ...props }) => (
  <input
    value={value}
    checked={field.value.indexOf(value) !== -1}
    {...props}
    type="checkbox"
  />
), 'checkbox');
