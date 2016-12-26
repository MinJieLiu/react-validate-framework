'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _validate = require('validate-framework/lib/validate');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by MingYi on 2016/12/23.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * 扩展必填验证方法，支持数组判断
 * @param field
 * @return {boolean}
 */
_validate2.default.required = function (field) {
  if (typeof field === 'string') {
    return field !== '';
  } else if (Array.isArray(field.value)) {
    return field.value.length;
  }
  return field.value !== null && field.value !== '';
};

/**
 * 包装组件方法
 * @param schemas
 */

exports.default = function (schemas) {
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

          var values = props.values;

          // 将初始化数据组装成 fields
          var fields = {};
          Object.keys(values).forEach(function (name) {
            fields[name] = {
              value: values[name]
            };
          });

          _this.state = {
            fields: fields
          };

          // 自定义验证方法
          _this.validator = Object.assign(_validate2.default, FormComponent.validator);
          return _this;
        }

        _createClass(FormControl, [{
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            // 受控组件从父组件中更新 state
            var values = nextProps.values,
                onChange = nextProps.onChange;

            if (!onChange) {
              return;
            }
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
                // 添加新的 field
                fields[name] = {
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
           * 此方法改变了状态，下个组件中集中更新 state
           * @param name
           * @param value
           */
          value: function assembleFieldValidate(name, value) {
            var fields = this.state.fields;
            // 验证
            // 无 schema 则不验证

            var schema = schemas[name] && Object.assign(schemas[name], { value: value });

            var _ref = schema ? this.validator.validateByField(schema) : {},
                result = _ref.result,
                error = _ref.error;

            // 组装


            Object.assign(fields[name], {
              value: value,
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
            // 集中更新
            this.setState({
              fields: fields
            });

            return fields[name].result;
          }

          /**
           * 验证所有
           * @return {Object} fields
           */

        }, {
          key: 'validateFields',
          value: function validateFields() {
            var _this3 = this;

            var fields = this.state.fields;

            Object.keys(schemas).forEach(function (name) {
              // 组装数据
              _this3.assembleFieldValidate(name, fields[name].value);
            });
            // 集中更新
            this.setState({
              fields: fields
            });
          }

          // 表单改变事件监听


          /**
           * 通过 name 手动验证单个组件
           * @param name
           * @return {Boolean}
           */


          // 验证当前组件

        }, {
          key: 'render',
          value: function render() {
            var fields = this.state.fields;


            return _react2.default.createElement(FormComponent, _extends({}, this.props, {
              fields: fields,
              formValues: this.formValues,
              onChange: this.handleChange,
              validate: this.handleValidate,
              validateByName: this.handleValidateByName
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
        onChange: _react.PropTypes.func
      }, _initialiseProps = function _initialiseProps() {
        var _this4 = this;

        this.handleChange = function (e) {
          // 受控组件让父组件管理改变事件
          var onChange = _this4.props.onChange;

          if (onChange) {
            onChange(e);
            return;
          }

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

          // 验证并更新
          _this4.validateField(name, theValue);
        };

        this.handleValidateByName = function (name) {
          var fields = _this4.state.fields;

          var value = fields[name].value;
          return _this4.validateField(name, value);
        };

        this.handleValidate = function () {
          // 验证
          _this4.validateFields();
          var fields = _this4.state.fields;
          // 排除 验证成功 和 未验证 状态

          return Object.keys(fields).every(function (name) {
            return fields[name].result !== false;
          });
        };
      }, _temp
    );
  };
};
//# sourceMappingURL=FormControl.js.map