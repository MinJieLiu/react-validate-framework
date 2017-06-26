import React from 'react';
import PropTypes from 'prop-types';

/**
 * Error message component
 * @param name
 * @param htmlFor
 * @param props - Other params
 * @param fields - ContextType
 * @constructor
 */
const Message = ({ name, htmlFor, ...props }, { formControl: { fields } }) => (
  <label
    htmlFor={htmlFor}
    {...props}
  >
    {fields[name].message}
  </label>
);

Message.propTypes = {
  name: PropTypes.string.isRequired,
  htmlFor: PropTypes.string,
};

Message.contextTypes = {
  formControl: PropTypes.object.isRequired,
};

export default Message;
