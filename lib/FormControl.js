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

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
 * @return Component
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
              values = props.values,
              delay = props.delay;
          // delay

          if (delay) {
            _this.delayValidateField = (0, _debounce2.default)(_this.delayValidateField.bind(_this), delay);
          }

          var fields = {};
          // Assemble the initialization data into fields
          if (values) {
            Object.keys(values).forEach(function (name) {
              fields[name] = {
                className: classNames.static,
                value: values[name]
              };
            });
          }

          _this.state = {
            fields: fields
          };

          // Initializes the validation component and customizes the validation method
          _this.validator = new _validateFrameworkUtils2.default();
          Object.assign(_this.validator, methods, {
            fields: fields
          });
          return _this;
        }

        _createClass(FormControl, [{
          key: 'getChildContext',
          value: function getChildContext() {
            return {
              fields: this.state.fields,
              initField: this.init,
              onFormChange: this.onFormChange
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


            Object.keys(values).forEach(function (name) {
              var newValue = values[name];
              // Validate the new data
              if (fields[name]) {
                // diff
                if (fields[name].value !== newValue) {
                  _this2.assembleFieldChange(name, newValue).delayValidateField(name, newValue);
                }
              } else {
                // Add a new field
                fields[name] = {
                  className: classNames.static,
                  value: newValue
                };
              }
            });

            this.setState({
              fields: fields
            });
          }

          /**
           * Get the fields object
           * @returns {Object}
           */

        }, {
          key: 'delayValidateField',


          /**
           * DelayValidateField
           * @param name
           * @param value
           */
          value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(name, value) {
              var fields;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      fields = this.state.fields;
                      // Assemble

                      _context.next = 3;
                      return this.assembleFieldValidate(name, value);

                    case 3:
                      this.setState({
                        fields: fields
                      });
                      return _context.abrupt('return', this);

                    case 5:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));

            function delayValidateField(_x, _x2) {
              return _ref.apply(this, arguments);
            }

            return delayValidateField;
          }()

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
           * @param names
           */


          /**
           * Add one or more fields
           * @param values
           */


          /**
           * Deletes one or more fields
           * @param names
           */


          /**
           * Validate the component through names
           * @param names
           * @return {Boolean}
           */


          // Validate all


          // After change

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

        }]);

        return FormControl;
      }(_react2.default.Component), _class.propTypes = {
        values: _propTypes2.default.object,
        classNames: _propTypes2.default.object,
        delay: _propTypes2.default.number
      }, _class.childContextTypes = {
        fields: _propTypes2.default.object.isRequired,
        initField: _propTypes2.default.func.isRequired,
        onFormChange: _propTypes2.default.func.isRequired
      }, _class.defaultProps = {
        classNames: {},
        delay: 0
      }, _initialiseProps = function _initialiseProps() {
        var _this3 = this;

        this.schemas = Object.assign({}, schemas);

        this.init = function (values, classes) {
          var fields = _this3.state.fields;
          // Assign classNames

          _this3.initClassNames(classes);
          // Initialize
          Object.keys(values).forEach(function (name) {
            var value = values[name];
            fields[name] = {
              className: _this3.props.classNames.static,
              value: value
            };
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

        this.assembleFieldChange = function (name, value) {
          Object.assign(_this3.state.fields[name], {
            value: value
          });
          return _this3;
        };

        this.assembleFieldValidate = function () {
          var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(name, value) {
            var classNames, fields, schema, _ref3, result, error, classNameArray;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    classNames = _this3.props.classNames;
                    fields = _this3.state.fields;
                    // No schema is not to validate

                    schema = _this3.schemas[name] && Object.assign(_this3.schemas[name], { value: value });

                    if (!schema) {
                      _context2.next = 9;
                      break;
                    }

                    _context2.next = 6;
                    return _this3.validator.validateByField(schema);

                  case 6:
                    _context2.t0 = _context2.sent;
                    _context2.next = 10;
                    break;

                  case 9:
                    _context2.t0 = {};

                  case 10:
                    _ref3 = _context2.t0;
                    result = _ref3.result;
                    error = _ref3.error;

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
                    return _context2.abrupt('return', _this3);

                  case 16:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, _this3);
          }));

          return function (_x3, _x4) {
            return _ref2.apply(this, arguments);
          };
        }();

        this.validateField = function () {
          var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(name, value) {
            var fields;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    fields = _this3.state.fields;
                    // Assemble

                    _context3.next = 3;
                    return _this3.assembleFieldValidate(name, value);

                  case 3:
                    return _context3.abrupt('return', fields[name].result);

                  case 4:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3, _this3);
          }));

          return function (_x5, _x6) {
            return _ref4.apply(this, arguments);
          };
        }();

        this.validateFieldsByNames = function () {
          var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
            for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
              names[_key] = arguments[_key];
            }

            var fields, isValid, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, name, result;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    fields = _this3.state.fields;
                    isValid = true;
                    // eslint-disable-next-line no-restricted-syntax

                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context4.prev = 5;
                    _iterator = names[Symbol.iterator]();

                  case 7:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                      _context4.next = 19;
                      break;
                    }

                    name = _step.value;
                    _context4.t0 = fields[name];

                    if (!_context4.t0) {
                      _context4.next = 14;
                      break;
                    }

                    _context4.next = 13;
                    return _this3.validateField(name, fields[name].value);

                  case 13:
                    _context4.t0 = _context4.sent;

                  case 14:
                    result = _context4.t0;

                    // Exclude unauthenticated and validated successfully
                    if (result === false) {
                      isValid = false;
                    }

                  case 16:
                    _iteratorNormalCompletion = true;
                    _context4.next = 7;
                    break;

                  case 19:
                    _context4.next = 25;
                    break;

                  case 21:
                    _context4.prev = 21;
                    _context4.t1 = _context4['catch'](5);
                    _didIteratorError = true;
                    _iteratorError = _context4.t1;

                  case 25:
                    _context4.prev = 25;
                    _context4.prev = 26;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                      _iterator.return();
                    }

                  case 28:
                    _context4.prev = 28;

                    if (!_didIteratorError) {
                      _context4.next = 31;
                      break;
                    }

                    throw _iteratorError;

                  case 31:
                    return _context4.finish(28);

                  case 32:
                    return _context4.finish(25);

                  case 33:
                    return _context4.abrupt('return', isValid);

                  case 34:
                  case 'end':
                    return _context4.stop();
                }
              }
            }, _callee4, _this3, [[5, 21, 25, 33], [26,, 28, 32]]);
          }));

          return function () {
            return _ref5.apply(this, arguments);
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
          _this3.assembleFieldChange(name, theValue).delayValidateField(name, theValue);
          // Update
          _this3.setState({
            fields: fields
          });
          _this3.formDidChange();
        };

        this.changeValues = function (values) {
          var fields = _this3.state.fields;
          // Initializes

          _this3.init(values);
          Object.keys(values).forEach(function (name) {
            return _this3.assembleFieldChange(name, values[name]).delayValidateField(name, values[name]);
          });
          // Update
          _this3.setState({
            fields: fields
          });
          _this3.formDidChange();
          return _this3;
        };

        this.addSchemas = function (schema) {
          Object.assign(_this3.schemas, schema);
          return _this3;
        };

        this.removeSchemas = function () {
          var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
            for (var _len2 = arguments.length, names = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              names[_key2] = arguments[_key2];
            }

            var fields;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    fields = _this3.state.fields;

                    names.forEach(function (name) {
                      delete _this3.schemas[name];
                    });
                    // Validate the deleted status
                    _context5.next = 4;
                    return _this3.validateFieldsByNames.apply(_this3, names);

                  case 4:
                    // Update
                    _this3.setState({
                      fields: fields
                    });
                    return _context5.abrupt('return', _this3);

                  case 6:
                  case 'end':
                    return _context5.stop();
                }
              }
            }, _callee5, _this3);
          }));

          return function () {
            return _ref6.apply(this, arguments);
          };
        }();

        this.addValues = function (values) {
          var fields = _this3.state.fields;
          // Initializes

          _this3.init(values);
          // Update
          _this3.setState({
            fields: fields
          });
          _this3.formDidChange();
          return _this3;
        };

        this.removeValues = function () {
          for (var _len3 = arguments.length, names = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            names[_key3] = arguments[_key3];
          }

          var fields = _this3.state.fields;

          names.forEach(function (name) {
            delete fields[name];
          });
          // Update
          _this3.setState({
            fields: fields
          });
          _this3.formDidChange();
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
          var names = Object.keys(_this3.schemas);
          return _this3.validateByNames.apply(_this3, _toConsumableArray(names));
        };

        this.formDidChange = function () {};
      }, _temp
    );
  };
};
//# sourceMappingURL=FormControl.js.map