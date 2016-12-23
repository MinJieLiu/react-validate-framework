/**
 * Created by MingYi on 2016/12/23.
 */

import React, { Component, PropTypes } from 'react';

class Input extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };

  handleChange = (e) => {
    const { onChange } = this.props;
    onChange(e);
  };

  render() {
    const {
      name,
      value,
    } = this.props;

    return (
      <input
        name={name}
        value={value}
        onChange={this.handleChange}
      />
    );
  }

}

export default Input;
