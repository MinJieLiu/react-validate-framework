import React from 'react';
import Field from '../Field';

const Select = Field.bind(null, ({ field, className, ...props }) => (
  <select
    className={[field.className, className].join('\u{20}')}
    value={field.value}
    {...props}
  />
), 'select');

export default Object.assign(Select, Field);
