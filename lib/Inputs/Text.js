'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createField = require('../createField');

var _createField2 = _interopRequireDefault(_createField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = (0, _createField2.default)(function (_ref) {
  var field = _ref.field,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ['field', 'className']);

  return _react2.default.createElement('input', _extends({
    className: [field.className, className].join(' '),
    type: 'text',
    value: field.value
  }, props));
}, 'text');
//# sourceMappingURL=Text.js.map