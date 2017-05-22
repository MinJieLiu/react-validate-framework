import React from 'react';
import Field from '../Field';

const Textarea = Field.bind(null, ({ field, className, ...props }) => (
  <textarea
    className={[field.className, className].join('\u{20}')}
    value={field.value}
    {...props}
  />
), 'textarea');

export default Object.assign(Textarea, Field);
