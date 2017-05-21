import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
  htmlFor: PropTypes.string,
};

const contextTypes = {
  fields: PropTypes.object.isRequired,
};

/**
 * Error message component
 * @param name
 * @param htmlFor
 * @param props
 * @param fields
 * @constructor
 */
const Message = ({ name, htmlFor, ...props }, { fields }) => (
  <label
    htmlFor={htmlFor}
    {...props}
  >
    {fields[name].message}
  </label>
);

Message.propTypes = propTypes;
Message.contextTypes = contextTypes;

export default Message;
