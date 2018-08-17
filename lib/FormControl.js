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

var _validateFrameworkUtils = require('validate-framework-utils');

var _validateFrameworkUtils2 = _interopRequireDefault(_validateFrameworkUtils);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isnumber');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * A lightweight and extensible React validation component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ORIGINAL_VALUES = Symbol('#ORIGINAL_VALUES');
var ORIGINAL_CLASS_NAMES = Symbol('#ORIGINAL_CLASS_NAMES');

var GET_RESULT_FROM_SCHEMA = Symbol('#GET_RESULT_FROM_SCHEMA');
var ASSEMBLE_FIELD_FROM_RESULT = Symbol('#ASSEMBLE_FIELD_FROM_RESULT');

var ASSEMBLE_FIELD_CHANGE = Symbol('#ASSEMBLE_FIELD_CHANGE');
var ASYNC_ASSEMBLE_FIELD_CHANGE = Symbol('#ASYNC_ASSEMBLE_FIELD_CHANGE');

var ASSEMBLE_FIELD_VALIDATE = Symbol('#ASSEMBLE_FIELD_VALIDATE');
var ASYNC_ASSEMBLE_FIELD_VALIDATE = Symbol('#ASYNC_ASSEMBLE_FIELD_VALIDATE');

/**
 * React validation component
 * @param schemas
 * @param methods Extended Validation Method
 */

exports.default = function (schemas, methods) {
  return function (FormComponent) {
    var _class, _temp, _initialiseProps;

    return (

      /**
       * Returns a react form
       */
      _temp = _class = function (_React$Component) {
        _inherits(FormControl, _React$Component);

        function FormControl(props) {
          _classCallCheck(this, FormControl);

          var _this = _possibleConstructorReturn(this, (FormControl.__proto__ || Object.getPrototypeOf(FormControl)).call(this, props));

          _initialiseProps.call(_this);

          var values = props.values,
              classNames = props.classNames;


          _this.state = {
            fields: {}
          };

          if (classNames) {
            _this.initClassNames(classNames);
          }
          if (values) {
            _this.init(values);
          }

          // Initializes the validation component and customizes the validation method
          _this.validator = new _validateFrameworkUtils2.default();
          Object.assign(_this.validator, methods, { fields: _this.state.fields });
          return _this;
        }

        _createClass(FormControl, [{
          key: 'getChildContext',
          value: function getChildContext() {
            return {
              formControl: this
            };
          }
        }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var values = nextProps.values;
            // No value

            if (!values) {
              return;
            }
            // Updates the state from the parent component
            var fields = this.state.fields;


            _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
              var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, name, theValue, value;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      // eslint-disable-next-line no-restricted-syntax
                      _iteratorNormalCompletion = true;
                      _didIteratorError = false;
                      _iteratorError = undefined;
                      _context.prev = 3;
                      _iterator = Object.keys(values)[Symbol.iterator]();

                    case 5:
                      if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context.next = 19;
                        break;
                      }

                      name = _step.value;
                      theValue = values[name];
                      // Convert to string

                      value = (0, _lodash4.default)(theValue) ? String(theValue) : theValue;
                      // Validate the new data

                      if (!fields[name]) {
                        _context.next = 15;
                        break;
                      }

                      if (!(fields[name].value !== value)) {
                        _context.next = 13;
                        break;
                      }

                      _context.next = 13;
                      return _this2[ASYNC_ASSEMBLE_FIELD_CHANGE](name, value);

                    case 13:
                      _context.next = 16;
                      break;

                    case 15:
                      // Add a new field
                      fields[name] = {
                        className: _this2[ORIGINAL_CLASS_NAMES].static,
                        value: value
                      };

                    case 16:
                      _iteratorNormalCompletion = true;
                      _context.next = 5;
                      break;

                    case 19:
                      _context.next = 25;
                      break;

                    case 21:
                      _context.prev = 21;
                      _context.t0 = _context['catch'](3);
                      _didIteratorError = true;
                      _iteratorError = _context.t0;

                    case 25:
                      _context.prev = 25;
                      _context.prev = 26;

                      if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                      }

                    case 28:
                      _context.prev = 28;

                      if (!_didIteratorError) {
                        _context.next = 31;
                        break;
                      }

                      throw _iteratorError;

                    case 31:
                      return _context.finish(28);

                    case 32:
                      return _context.finish(25);

                    case 33:
                      // Update
                      _this2.setState({
                        fields: fields
                      });

                    case 34:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, _this2, [[3, 21, 25, 33], [26,, 28, 32]]);
            }))();
          }

          /**
           * Get the fields object
           * @returns {Object}
           */

        }, {
          key: 'render',
          value: function render() {
            return _react2.default.createElement(FormComponent, _extends({}, this.props, {
              formControl: this
            }));
          }
        }, {
          key: 'fields',
          get: function get() {
            return this.state.fields;
          }

          /**
           * Gets a list of form values
           * @return {Object}
           */

        }, {
          key: 'formValues',
          get: function get() {
            var fields = this.state.fields;

            var values = {};
            Object.keys(fields).forEach(function (name) {
              values[name] = fields[name].value;
            });
            return values;
          }

          /**
           * Gets the global validation status
           * @return {Boolean}
           */

        }, {
          key: 'isAllValid',
          get: function get() {
            var fields = this.state.fields;

            return Object.keys(this.schemas).every(function (name) {
              return fields[name] && fields[name].result;
            });
          }

          /**
           * Initializes the form value and classes
           * @param values
           * @param classes
           */


          /**
           * Init classNames
           * @param classes
           */


          /**
           * Create asynchronous validation
           * See createField.jsx
           * @param ms
           * @return {Function}
           */


          /**
           * Validate fields by names
           * @param names
           * @return {Boolean}
           */


          // Form change event listener


          /**
           * Customize to change the values
           * @param values
           */


          /**
           * Add one or more validation rules
           * @param schema
           */


          /**
           * Delete one or more validation rules
           * If there is no name, it will all be removed.
           * @param names
           */


          /**
           * Add one or more fields
           * @param values
           */


          /**
           * Deletes one or more fields
           * If there is no name, it will all be removed.
           * @param names
           */


          /**
           * Reset one or more fields
           * If there is no name, it will all be init.
           * @param names
           */


          /**
           * Validate the component through names
           * @param names
           * @return {Boolean}
           */


          /**
           * Validate all
           * @return {Boolean}
           */


          // After change

        }]);

        return FormControl;
      }(_react2.default.Component), _class.propTypes = {
        values: _propTypes2.default.object,
        classNames: _propTypes2.default.object
      }, _class.childContextTypes = {
        formControl: _propTypes2.default.object.isRequired
      }, _initialiseProps = function _initialiseProps() {
        var _this3 = this;

        this.schemas = _extends({}, schemas);
        this[ORIGINAL_VALUES] = {};
        this[ORIGINAL_CLASS_NAMES] = {};

        this.init = function (values, classes) {
          var fields = _this3.state.fields;
          // Assign classNames

          if (classes) {
            _this3.initClassNames(classes);
          }
          // Initialize
          Object.keys(values).forEach(function (name) {
            var theValue = values[name];
            // Convert to string
            var value = (0, _lodash4.default)(theValue) ? String(theValue) : theValue;
            fields[name] = _extends({}, fields[name], {
              className: _this3[ORIGINAL_CLASS_NAMES].static,
              value: value
            });
            // Only initialized once
            if (_this3[ORIGINAL_VALUES][name] === undefined) {
              _this3[ORIGINAL_VALUES][name] = value;
            }
            // Synchronize values external state
            if (_this3.props.values) {
              _this3.props.values[name] = value;
            }
          });
          return _this3;
        };

        this.initClassNames = function (classes) {
          // Merge
          Object.assign(_this3[ORIGINAL_CLASS_NAMES], classes);
          return _this3;
        };

        this.createDelayValidateFunc = function (ms) {
          var debounceValidateAndUpdate = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
              var _args2 = arguments;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return _this3[ASYNC_ASSEMBLE_FIELD_VALIDATE].apply(_this3, _args2);

                    case 2:
                      _this3.forceUpdate();

                    case 3:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, _this3);
            }));

            return function debounceValidateAndUpdate() {
              return _ref2.apply(this, arguments);
            };
          }();
          return (0, _lodash2.default)(debounceValidateAndUpdate, ms);
        };

        this[ASSEMBLE_FIELD_CHANGE] = function (name, value) {
          var fields = _this3.state.fields;

          fields[name].value = value;
          // Async
          if (fields[name].delayFunc) {
            fields[name].delayFunc(name, value);
          } else {
            _this3[ASSEMBLE_FIELD_VALIDATE](name, value);
          }
        };

        this[ASYNC_ASSEMBLE_FIELD_CHANGE] = function () {
          var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(name, value) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _this3.state.fields[name].value = value;
                    _context3.next = 3;
                    return _this3[ASYNC_ASSEMBLE_FIELD_VALIDATE](name, value);

                  case 3:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3, _this3);
          }));

          return function (_x, _x2) {
            return _ref3.apply(this, arguments);
          };
        }();

        this[GET_RESULT_FROM_SCHEMA] = function (name, value) {
          var schema = _this3.schemas[name];
          return schema ? _this3.validator.validateField(_extends({}, schema, { name: name }))(value) : {};
        };

        this[ASSEMBLE_FIELD_FROM_RESULT] = function (name, _ref4) {
          var result = _ref4.result,
              error = _ref4.error;

          var classNames = _this3[ORIGINAL_CLASS_NAMES];
          var fields = _this3.state.fields;


          var classNameArray = [classNames.static, result ? classNames.success : null, result === false ? classNames.error : null];
          // Assemble
          Object.assign(fields[name], {
            className: classNameArray.filter(function (item) {
              return item;
            }).join(' '),
            result: result,
            message: error ? error.message : undefined
          });
        };

        this[ASSEMBLE_FIELD_VALIDATE] = function (name, value) {
          var resultField = _this3[GET_RESULT_FROM_SCHEMA](name, value);
          _this3[ASSEMBLE_FIELD_FROM_RESULT](name, resultField);
        };

        this[ASYNC_ASSEMBLE_FIELD_VALIDATE] = function () {
          var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(name, value) {
            var resultField;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return _this3[GET_RESULT_FROM_SCHEMA](name, value);

                  case 2:
                    resultField = _context4.sent;

                    _this3[ASSEMBLE_FIELD_FROM_RESULT](name, resultField);

                  case 4:
                  case 'end':
                    return _context4.stop();
                }
              }
            }, _callee4, _this3);
          }));

          return function (_x3, _x4) {
            return _ref5.apply(this, arguments);
          };
        }();

        this.validateFieldsByNames = function () {
          var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
            for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
              names[_key] = arguments[_key];
            }

            var fields, isValid, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, name;

            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    fields = _this3.state.fields;
                    isValid = true;
                    // eslint-disable-next-line no-restricted-syntax

                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    _context5.prev = 5;
                    _iterator2 = names[Symbol.iterator]();

                  case 7:
                    if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                      _context5.next = 16;
                      break;
                    }

                    name = _step2.value;

                    if (!fields[name]) {
                      _context5.next = 13;
                      break;
                    }

                    _context5.next = 12;
                    return _this3[ASYNC_ASSEMBLE_FIELD_VALIDATE](name, fields[name].value);

                  case 12:

                    // Exclude unauthenticated and validated successfully
                    if (fields[name].result === false) {
                      isValid = false;
                    }

                  case 13:
                    _iteratorNormalCompletion2 = true;
                    _context5.next = 7;
                    break;

                  case 16:
                    _context5.next = 22;
                    break;

                  case 18:
                    _context5.prev = 18;
                    _context5.t0 = _context5['catch'](5);
                    _didIteratorError2 = true;
                    _iteratorError2 = _context5.t0;

                  case 22:
                    _context5.prev = 22;
                    _context5.prev = 23;

                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                      _iterator2.return();
                    }

                  case 25:
                    _context5.prev = 25;

                    if (!_didIteratorError2) {
                      _context5.next = 28;
                      break;
                    }

                    throw _iteratorError2;

                  case 28:
                    return _context5.finish(25);

                  case 29:
                    return _context5.finish(22);

                  case 30:
                    return _context5.abrupt('return', isValid);

                  case 31:
                  case 'end':
                    return _context5.stop();
                }
              }
            }, _callee5, _this3, [[5, 18, 22, 30], [23,, 25, 29]]);
          }));

          return function () {
            return _ref6.apply(this, arguments);
          };
        }();

        this.onFormChange = function (e) {
          var _e$target = e.target,
              name = _e$target.name,
              type = _e$target.type,
              value = _e$target.value;
          var fields = _this3.state.fields;

          // Dependent on the name attribute

          if (!name) {
            return;
          }

          var theValue = void 0;
          // Checkbox processing
          if (type === 'checkbox') {
            theValue = fields[name].value.slice();
            var index = theValue.indexOf(value);
            if (index === -1) {
              theValue.push(value);
            } else {
              theValue.splice(index, 1);
            }
          } else {
            theValue = value;
          }
          // Synchronize values external state
          if (_this3.props.values) {
            _this3.props.values[name] = theValue;
          }
          // Assemble and delay validate
          _this3[ASSEMBLE_FIELD_CHANGE](name, theValue);
          // Update
          _this3.setState({
            fields: fields
          });
          _this3.formDidChange(_defineProperty({}, name, theValue));
        };

        this.changeValues = function (values) {
          var fields = _this3.state.fields;
          // Initializes

          _this3.init(values);
          Object.keys(values).forEach(function (name) {
            _this3[ASSEMBLE_FIELD_CHANGE](name, values[name]);
          });
          // Update
          _this3.setState({
            fields: fields
          });
          _this3.formDidChange(values);
          return _this3;
        };

        this.addSchemas = function (schema) {
          Object.assign(_this3.schemas, schema);
          return _this3;
        };

        this.removeSchemas = function () {
          for (var _len2 = arguments.length, names = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            names[_key2] = arguments[_key2];
          }

          if (names.length) {
            names.forEach(function (name) {
              delete _this3.schemas[name];
            });
          } else {
            _this3.schemas = {};
          }
          // Validate the deleted status
          _this3.validateByNames.apply(_this3, names);
          return _this3;
        };

        this.addValues = function (values) {
          var fields = _this3.state.fields;
          // Initializes

          _this3.init(values);
          // Update
          _this3.setState({
            fields: fields
          });
          _this3.formDidChange(values);
          return _this3;
        };

        this.removeValues = function () {
          for (var _len3 = arguments.length, names = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            names[_key3] = arguments[_key3];
          }

          var fields = _this3.state.fields;

          if (names.length) {
            names.forEach(function (name) {
              delete fields[name];
              if (_this3.props.values) {
                delete _this3.props.values[name];
              }
            });
          } else {
            // Remove all
            Object.keys(fields).forEach(function (name) {
              delete _this3.state.fields[name];
              if (_this3.props.values) {
                delete _this3.props.values[name];
              }
            });
          }
          // Update
          _this3.setState({
            fields: fields
          });
          _this3.formDidChange({});
          return _this3;
        };

        this.resetValues = function () {
          for (var _len4 = arguments.length, names = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            names[_key4] = arguments[_key4];
          }

          var fields = _this3.state.fields;

          var values = {};
          if (names.length) {
            names.forEach(function (name) {
              values[name] = _this3[ORIGINAL_VALUES][name];
            });
            _this3.init(values);
          } else {
            // Init all
            Object.assign(values, _this3[ORIGINAL_VALUES]);
            _this3.init(values);
          }
          // Update
          _this3.setState({
            fields: fields
          });
          _this3.formDidChange(values);
          return _this3;
        };

        this.validateByNames = function () {
          var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
            var result,
                fields,
                _args6 = arguments;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return _this3.validateFieldsByNames.apply(_this3, _args6);

                  case 2:
                    result = _context6.sent;
                    fields = _this3.state.fields;
                    // Update

                    _this3.setState({
                      fields: fields
                    });
                    return _context6.abrupt('return', result);

                  case 6:
                  case 'end':
                    return _context6.stop();
                }
              }
            }, _callee6, _this3);
          }));

          return function () {
            return _ref7.apply(this, arguments);
          };
        }();

        this.validate = function () {
          return _this3.validateByNames.apply(_this3, _toConsumableArray(Object.keys(_this3.schemas)));
        };

        this.formDidChange = function () {};
      }, _temp
    );
  };
};
//# sourceMappingURL=FormControl.js.map