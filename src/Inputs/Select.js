import React from 'react';
import Field from '../Field';

export default Object.assign(Field.bind(null, ({ field, ...props }) => (
  <select
    className={field.className}
    value={field.value}
    {...props}
  />
)), Field);
