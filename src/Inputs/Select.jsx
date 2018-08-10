import React from 'react';
import createField from '../createField';

export default createField(({ field, className, ...props }) => (
  <select
    className={[field.className, className].join('\u{20}')}
    value={field.value}
    {...props}
  />
), 'select');
