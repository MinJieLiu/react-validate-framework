'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _validateFrameworkUtils = require('validate-framework-utils');

var _validateFrameworkUtils2 = _interopRequireDefault(_validateFrameworkUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by MingYi on 2016/12/23.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * React form 验证组件
 * @param schemas 验证规则
 * @param methods 扩展验证方法
 * @return Component
 */
exports.default = function (schemas, methods) {
  return function (FormComponent) {
    var _class, _temp, _initialiseProps;

    return (

      /**
       * 验证组件
       */
      _temp = _class = function (_Component) {
        _inherits(FormControl, _Component);

        function FormControl(props) {
          _classCallCheck(this, FormControl);

          var _this = _possibleConstructorReturn(this, (FormControl.__proto__ || Object.getPrototypeOf(FormControl)).call(this, props));

          _initialiseProps.call(_this);

          var classNames = props.classNames,
              values = props.values;

          // 将初始化数据组装成 fields

          var fields = {};
          Object.keys(values).forEach(function (name) {
            fields[name] = {
              className: classNames.static,
              value: values[name]
            };
          });

          _this.state = {
            fields: fields
          };

          // 初始化验证组件并自定义验证方法
          _this.validator = new _validateFrameworkUtils2.default().addMethods(methods);
          return _this;
        }

        _createClass(FormControl, [{
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            // 从父组件中更新 state
            var values = nextProps.values;
            var classNames = this.props.classNames;
            var fields = this.state.fields;


            Object.keys(values).forEach(function (name) {
              var newValue = values[name];
              // 存在，则验证新的数据
              if (fields[name]) {
                // diff 验证
                if (fields[name].value !== newValue) {
                  _this2.assembleFieldValidate(name, newValue);
                }
              } else {
                // 不存在，则添加新的 field
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
           * 获取表单值列表
           * @return {Object}
           */

        }, {
          key: 'assembleFieldValidate',


          /**
           * 组装数据
           * 此方法不 setState
           * @param name
           * @param value
           */
          value: function assembleFieldValidate(name, value) {
            var classNames = this.props.classNames;
            var fields = this.state.fields;
            // 验证
            // 无 schema 则不验证

            var schema = schemas[name] && Object.assign(schemas[name], { value: value });

            var _ref = schema ? this.validator.validateByField(schema) : {},
                result = _ref.result,
                error = _ref.error;
            // 组装类名
            // 验证成功和验证失败添加相应类


            var classNameArray = [classNames.static, result ? classNames.success : null, result === false ? classNames.error : null];
            // 组装
            Object.assign(fields[name], {
              value: value,
              className: classNameArray.filter(function (item) {
                return item;
              }).join(' '),
              result: result,
              message: error ? error.message : null
            });
          }

          /**
           * 验证单个域
           * @param name
           * @param value
           * @return {Boolean}
           */

        }, {
          key: 'validateField',
          value: function validateField(name, value) {
            var fields = this.state.fields;
            // 组装数据

            this.assembleFieldValidate(name, value);
            return fields[name].result;
          }

          /**
           * 通过 names 验证
           * @param names
           * @return {Boolean}
           */

        }, {
          key: 'validateByNames',
          value: function validateByNames() {
            var _this3 = this;

            var fields = this.state.fields;

            var isValid = true;

            for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
              names[_key] = arguments[_key];
            }

            names.forEach(function (name) {
              var result = _this3.validateField(name, fields[name].value);
              // 排除 未验证 和 验证成功
              if (result === false) {
                isValid = false;
              }
            });
            return isValid;
          }

          /**
           * 验证所有域
           * @return {Boolean}
           */

        }, {
          key: 'validateAllFields',
          value: function validateAllFields() {
            var names = Object.keys(schemas);
            return this.validateByNames.apply(this, _toConsumableArray(names));
          }

          // 表单改变事件监听


          /**
           * 添加一条或多条验证规则
           * @param schema
           */


          /**
           * 删除一条或多条验证规则
           * @param names
           */


          /**
           * 添加一条或多条域
           * @param newFields
           */


          /**
           * 删除一条或多条域
           * @param names
           */


          /**
           * 通过 names 验证组件
           * @param names
           * @return {Boolean}
           */


          // 验证所有

        }, {
          key: 'render',
          value: function render() {
            var _state = this.state,
                fields = _state.fields,
                isAllValid = _state.isAllValid;


            return _react2.default.createElement(FormComponent, _extends({}, this.props, {
              fields: fields,
              isAllValid: isAllValid,
              formValues: this.formValues,
              onChange: this.handleChange,
              validate: this.handleValidate,
              validateByNames: this.handleValidateByNames,
              addFields: this.handleAddFields,
              removeFields: this.handleRemoveFields,
              addSchemas: this.handleAddSchemas,
              removeSchemas: this.handleRemoveSchemas
            }));
          }
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
        }]);

        return FormControl;
      }(_react.Component), _class.propTypes = {
        values: _react.PropTypes.object.isRequired,
        classNames: _react.PropTypes.object
      }, _class.defaultProps = {
        classNames: {}
      }, _initialiseProps = function _initialiseProps() {
        var _this4 = this;

        this.handleChange = function (e) {
          var _e$target = e.target,
              name = _e$target.name,
              type = _e$target.type,
              value = _e$target.value;
          var fields = _this4.state.fields;

          // 依赖 name 属性

          if (!name) {
            return;
          }

          var theValue = void 0;
          // checkbox 处理
          if (type === 'checkbox') {
            theValue = fields[name].value.slice();
            var index = theValue.findIndex(function (item) {
              return item === value;
            });
            if (index === -1) {
              theValue.push(value);
            } else {
              theValue.splice(index, 1);
            }
          } else {
            theValue = value;
          }

          // 验证
          _this4.validateField(name, theValue);

          // 更新
          _this4.setState({
            fields: fields
          });
        };

        this.handleAddSchemas = function (schema) {
          Object.assign(schemas, schema);
        };

        this.handleRemoveSchemas = function (names) {
          names.forEach(function (name) {
            delete schemas[name]; // eslint-disable-line no-param-reassign
          });
        };

        this.handleAddFields = function (newFields) {
          var classNames = _this4.props.classNames;
          var fields = _this4.state.fields;

          Object.keys(newFields).forEach(function (name) {
            Object.assign(newFields[name], {
              className: classNames.static
            });
          });
          // 组装
          Object.assign(fields, newFields);
          // 更新
          _this4.setState({
            fields: fields
          });
        };

        this.handleRemoveFields = function (names) {
          var fields = _this4.state.fields;

          names.forEach(function (name) {
            delete fields[name];
          });
          // 更新
          _this4.setState({
            fields: fields
          });
        };

        this.handleValidateByNames = function () {
          var result = _this4.validateByNames.apply(_this4, arguments);
          var fields = _this4.state.fields;
          // 更新

          _this4.setState({
            fields: fields
          });
          return result;
        };

        this.handleValidate = function () {
          // 验证
          var isAllValid = _this4.validateAllFields();
          var fields = _this4.state.fields;
          // 更新

          _this4.setState({
            fields: fields,
            isAllValid: isAllValid
          });
          return isAllValid;
        };
      }, _temp
    );
  };
};
//# sourceMappingURL=FormControl.js.map