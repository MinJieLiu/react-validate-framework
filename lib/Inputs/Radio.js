'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Radio = _Field2.default.bind(null, function (_ref) {
  var field = _ref.field,
      value = _ref.value,
      props = _objectWithoutProperties(_ref, ['field', 'value']);

  return _react2.default.createElement('input', _extends({
    value: value,
    checked: field.value === value
  }, props, {
    type: 'radio'
  }));
}, 'radio');

exports.default = Object.assign(Radio, _Field2.default);
//# sourceMappingURL=Radio.js.map