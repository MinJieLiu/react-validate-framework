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

          var classNames = props.classNames,
              values = props.values;


          _this.state = {
            fields: {}
          };

          // Init
          if (values) {
            _this.init(values, classNames);
          }

          // Initializes the validation component and customizes the validation method
          _this.validator = new _validateFrameworkUtils2.default();
          Object.assign(_this.validator, methods, { fields: _this.state.fields });
          return _this;
        }

        // Original


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
            var classNames = this.props.classNames;
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
                      return _this2.handleAssembleFieldChange(name, value);

                    case 13:
                      _context.next = 16;
                      break;

                    case 15:
                      // Add a new field
                      fields[name] = {
                        className: classNames.static,
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
           * Assemble the data
           * This method is not operational
           * @param name
           * @param value
           * @return {FormControl}
           */


          /**
           * Validate the data
           * This method is not operational
           * @param name
           * @param value
           * @return {FormControl}
           */


          /**
           * Validate a single field
           * @param name
           * @param value
           * @return {Boolean}
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
      }, _class.defaultProps = {
        classNames: {}
      }, _initialiseProps = function _initialiseProps() {
        var _this3 = this;

        this.schemas = _extends({}, schemas);
        this.originalValues = {};

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
            fields[name] = {
              className: _this3.props.classNames.static,
              value: value
            };
            // Only initialized once
            if (_this3.originalValues[name] === undefined) {
              _this3.originalValues[name] = value;
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
          Object.assign(_this3.props.classNames, classes);
          return _this3;
        };

        this.handleCreateDelayValidateFunc = function (ms) {
          var debounceValidateAndUpdate = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
              var _args2 = arguments;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return _this3.handleAssembleFieldValidate.apply(_this3, _args2);

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

        this.handleAssembleFieldChange = function () {
          var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(name, value) {
            var fields;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    fields = _this3.state.fields;

                    fields[name].value = value;
                    // Async

                    if (!fields[name].delayFunc) {
                      _context3.next = 6;
                      break;
                    }

                    fields[name].delayFunc(name, value);
                    _context3.next = 8;
                    break;

                  case 6:
                    _context3.next = 8;
                    return _this3.handleAssembleFieldValidate(name, value);

                  case 8:
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

        this.handleAssembleFieldValidate = function () {
          var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(name, value) {
            var classNames, fields, schema, _ref5, result, error, classNameArray;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    classNames = _this3.props.classNames;
                    fields = _this3.state.fields;
                    // No schema is not to validate

                    schema = _this3.schemas[name];

                    if (!schema) {
                      _context4.next = 9;
                      break;
                    }

                    _context4.next = 6;
                    return _this3.validator.validateField(_extends({}, schema, { name: name }))(value);

                  case 6:
                    _context4.t0 = _context4.sent;
                    _context4.next = 10;
                    break;

                  case 9:
                    _context4.t0 = {};

                  case 10:
                    _ref5 = _context4.t0;
                    result = _ref5.result;
                    error = _ref5.error;


                    // Assembly class name
                    // Validation success and validation failure Add the appropriate class
                    classNameArray = [classNames.static, result ? classNames.success : null, result === false ? classNames.error : null];
                    // Assemble

                    Object.assign(fields[name], {
                      className: classNameArray.filter(function (item) {
                        return item;
                      }).join(' '),
                      result: result,
                      message: error ? error.message : undefined
                    });
                    return _context4.abrupt('return', _this3);

                  case 16:
                  case 'end':
                    return _context4.stop();
                }
              }
            }, _callee4, _this3);
          }));

          return function (_x3, _x4) {
            return _ref4.apply(this, arguments);
          };
        }();

        this.handleValidateField = function () {
          var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(name, value) {
            var fields;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    fields = _this3.state.fields;
                    // Assemble

                    _context5.next = 3;
                    return _this3.handleAssembleFieldValidate(name, value);

                  case 3:
                    return _context5.abrupt('return', fields[name].result);

                  case 4:
                  case 'end':
                    return _context5.stop();
                }
              }
            }, _callee5, _this3);
          }));

          return function (_x5, _x6) {
            return _ref6.apply(this, arguments);
          };
        }();

        this.validateFieldsByNames = function () {
          var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
            for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
              names[_key] = arguments[_key];
            }

            var fields, isValid, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, name, result;

            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    fields = _this3.state.fields;
                    isValid = true;
                    // eslint-disable-next-line no-restricted-syntax

                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    _context6.prev = 5;
                    _iterator2 = names[Symbol.iterator]();

                  case 7:
                    if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                      _context6.next = 19;
                      break;
                    }

                    name = _step2.value;
                    _context6.t0 = fields[name];

                    if (!_context6.t0) {
                      _context6.next = 14;
                      break;
                    }

                    _context6.next = 13;
                    return _this3.handleValidateField(name, fields[name].value);

                  case 13:
                    _context6.t0 = _context6.sent;

                  case 14:
                    result = _context6.t0;

                    // Exclude unauthenticated and validated successfully
                    if (result === false) {
                      isValid = false;
                    }

                  case 16:
                    _iteratorNormalCompletion2 = true;
                    _context6.next = 7;
                    break;

                  case 19:
                    _context6.next = 25;
                    break;

                  case 21:
                    _context6.prev = 21;
                    _context6.t1 = _context6['catch'](5);
                    _didIteratorError2 = true;
                    _iteratorError2 = _context6.t1;

                  case 25:
                    _context6.prev = 25;
                    _context6.prev = 26;

                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                      _iterator2.return();
                    }

                  case 28:
                    _context6.prev = 28;

                    if (!_didIteratorError2) {
                      _context6.next = 31;
                      break;
                    }

                    throw _iteratorError2;

                  case 31:
                    return _context6.finish(28);

                  case 32:
                    return _context6.finish(25);

                  case 33:
                    return _context6.abrupt('return', isValid);

                  case 34:
                  case 'end':
                    return _context6.stop();
                }
              }
            }, _callee6, _this3, [[5, 21, 25, 33], [26,, 28, 32]]);
          }));

          return function () {
            return _ref7.apply(this, arguments);
          };
        }();

        this.onFormChange = function () {
          var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(e) {
            var _e$target, name, type, value, fields, theValue, index;

            return regeneratorRuntime.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _e$target = e.target, name = _e$target.name, type = _e$target.type, value = _e$target.value;
                    fields = _this3.state.fields;

                    // Dependent on the name attribute

                    if (name) {
                      _context7.next = 4;
                      break;
                    }

                    return _context7.abrupt('return');

                  case 4:
                    theValue = void 0;
                    // Checkbox processing

                    if (type === 'checkbox') {
                      theValue = fields[name].value.slice();
                      index = theValue.indexOf(value);

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
                    _context7.next = 9;
                    return _this3.handleAssembleFieldChange(name, theValue);

                  case 9:
                    // Update
                    _this3.setState({
                      fields: fields
                    });
                    _this3.formDidChange(_defineProperty({}, name, theValue));

                  case 11:
                  case 'end':
                    return _context7.stop();
                }
              }
            }, _callee7, _this3);
          }));

          return function (_x7) {
            return _ref8.apply(this, arguments);
          };
        }();

        this.changeValues = function () {
          var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(values) {
            var fields;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    fields = _this3.state.fields;
                    // Initializes

                    _this3.init(values);
                    _context8.next = 4;
                    return Promise.all(Object.keys(values).map(function (name) {
                      return _this3.handleAssembleFieldChange(name, values[name]);
                    }));

                  case 4:
                    // Update
                    _this3.setState({
                      fields: fields
                    });
                    _this3.formDidChange(values);
                    return _context8.abrupt('return', _this3);

                  case 7:
                  case 'end':
                    return _context8.stop();
                }
              }
            }, _callee8, _this3);
          }));

          return function (_x8) {
            return _ref9.apply(this, arguments);
          };
        }();

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
              values[name] = _this3.originalValues[name];
            });
            _this3.init(values);
          } else {
            // Init all
            Object.assign(values, _this3.originalValues);
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
          var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
            var result,
                fields,
                _args9 = arguments;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return _this3.validateFieldsByNames.apply(_this3, _args9);

                  case 2:
                    result = _context9.sent;
                    fields = _this3.state.fields;
                    // Update

                    _this3.setState({
                      fields: fields
                    });
                    return _context9.abrupt('return', result);

                  case 6:
                  case 'end':
                    return _context9.stop();
                }
              }
            }, _callee9, _this3);
          }));

          return function () {
            return _ref10.apply(this, arguments);
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