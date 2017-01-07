'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Field component
                                                                                                                                                                                                                              */

var propTypes = {
  name: _react.PropTypes.string.isRequired
};

var contextTypes = {
  fields: _react.PropTypes.object.isRequired,
  handleChange: _react.PropTypes.func.isRequired
};

var Field = function Field(FormComponent, _ref, _ref2) {
  var name = _ref.name,
      props = _objectWithoutProperties(_ref, ['name']);

  var fields = _ref2.fields,
      handleChange = _ref2.handleChange;
  return _react2.default.createElement(FormComponent, _extends({
    name: name,
    field: fields[name],
    onChange: handleChange
  }, props));
};

Field.propTypes = propTypes;
Field.contextTypes = contextTypes;

exports.default = Field;
//# sourceMappingURL=Field.js.map