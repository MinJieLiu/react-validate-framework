/**
 * Error message component
 */

import React, { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string.isRequired,
  htmlFor: PropTypes.string,
};

const contextTypes = {
  fields: PropTypes.object.isRequired,
};

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
