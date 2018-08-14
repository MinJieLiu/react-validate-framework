'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Field component
 * @param FormComponent
 * @param fieldType
 * @constructor
 */
exports.default = function (FormComponent, fieldType) {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    _inherits(Field, _React$Component);

    function Field() {
      _classCallCheck(this, Field);

      return _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).apply(this, arguments));
    }

    _createClass(Field, [{
      key: 'render',
      // eslint-disable-line

      value: function render() {
        var _props = this.props,
            name = _props.name,
            delay = _props.delay,
            props = _objectWithoutProperties(_props, ['name', 'delay']);

        var _context$formControl = this.context.formControl,
            fields = _context$formControl.fields,
            init = _context$formControl.init,
            createDelayValidateFunc = _context$formControl.createDelayValidateFunc,
            onFormChange = _context$formControl.onFormChange;

        // Initialize field.

        if (!fields[name]) {
          // Checkbox uses an array
          init(_defineProperty({}, name, fieldType === 'checkbox' ? [] : ''));
        }

        // Async
        if (delay && !fields[name].delayFunc) {
          fields[name].delayFunc = createDelayValidateFunc(delay);
        }

        return _react2.default.createElement(FormComponent, _extends({
          name: name,
          field: fields[name],
          onChange: onFormChange
        }, props));
      }
    }]);

    return Field;
  }(_react2.default.Component), _class.propTypes = {
    name: _propTypes2.default.string.isRequired,
    delay: _propTypes2.default.number
  }, _class.contextTypes = {
    formControl: _propTypes2.default.object.isRequired
  }, _temp;
};
//# sourceMappingURL=createField.js.map