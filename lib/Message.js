'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Error message component
                                                                                                                                                                                                                              */

var propTypes = {
  name: _react.PropTypes.string.isRequired,
  htmlFor: _react.PropTypes.string
};

var contextTypes = {
  fields: _react.PropTypes.object.isRequired
};

var Message = function Message(_ref, _ref2) {
  var fields = _ref2.fields;

  var name = _ref.name,
      htmlFor = _ref.htmlFor,
      props = _objectWithoutProperties(_ref, ['name', 'htmlFor']);

  return _react2.default.createElement(
    'label',
    _extends({
      htmlFor: htmlFor
    }, props),
    fields[name].message
  );
};

Message.propTypes = propTypes;
Message.contextTypes = contextTypes;

exports.default = Message;
//# sourceMappingURL=Message.js.map