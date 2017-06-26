'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Field component
 * @param FormComponent
 * @param fieldType - Input type
 * @param name
 * @param props - Other params
 * @param fields - ContextType
 * @param init - ContextType
 * @param onFormChange - ContextType
 * @constructor
 */
var Field = function Field(FormComponent, fieldType, _ref, _ref2) {
  var name = _ref.name,
      props = _objectWithoutProperties(_ref, ['name']);

  var _ref2$formControl = _ref2.formControl,
      fields = _ref2$formControl.fields,
      init = _ref2$formControl.init,
      onFormChange = _ref2$formControl.onFormChange;

  // Initialize field.
  if (!fields[name]) {
    // Checkbox uses an array
    init(_defineProperty({}, name, fieldType === 'checkbox' ? [] : ''));
  }
  return _react2.default.createElement(FormComponent, _extends({
    name: name,
    field: fields[name],
    onChange: onFormChange
  }, props));
};

Field.propTypes = {
  name: _propTypes2.default.string.isRequired
};

Field.contextTypes = {
  formControl: _propTypes2.default.object.isRequired
};

exports.default = Field;
//# sourceMappingURL=Field.js.map