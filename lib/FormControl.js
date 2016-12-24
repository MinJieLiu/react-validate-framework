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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by MingYi on 2016/12/23.
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
          return _this;
        }

        _createClass(FormControl, [{
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
            var values = nextProps.values;
            var fields = this.state.fields;

            Object.keys(values).forEach(function (name) {
              fields[name] = _extends({}, fields[name], {
                value: values[name]
              });
            });
            this.setState({
              fields: fields
            });
          }

          /**
           * 获取表单值列表
           * @return {{}}
           */

        }, {
          key: 'render',
          value: function render() {
            var fields = this.state.fields;


            return _react2.default.createElement(FormComponent, _extends({}, this.props, {
              fields: fields,
              onChange: this.handleChange,
              validate: this.handleValidate,
              formValues: this.formValues
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

          /**
           * 验证单个域
           * @param name
           * @param value
           * @return {*}
           */


          /**
           * 验证所有
           * @return {Object} fields
           */


          // 验证当前组件

        }]);

        return FormControl;
      }(_react.Component), _class.propTypes = {
        values: _react.PropTypes.object.isRequired,
        onChange: _react.PropTypes.func
      }, _initialiseProps = function _initialiseProps() {
        var _this2 = this;

        this.validateField = function (_ref) {
          var name = _ref.name,
              value = _ref.value;

          // 验证
          var schema = _extends({}, schemas[name], {
            value: value
          });
          return _validate2.default.validateByField(schema);
        };

        this.validateFields = function () {
          var fields = _this2.state.fields;

          Object.keys(schemas).forEach(function (name) {
            var schema = _extends({}, schemas[name], {
              value: fields[name].value
            });

            var _validator$validateBy = _validate2.default.validateByField(schema),
                result = _validator$validateBy.result,
                error = _validator$validateBy.error;

            Object.assign(fields[name], {
              result: result,
              message: error ? error.message : null
            });
          });

          _this2.setState({
            fields: fields
          });
        };

        this.handleChange = function (e) {
          var _e$target = e.target,
              name = _e$target.name,
              type = _e$target.type,
              value = _e$target.value;
          var onChange = _this2.props.onChange;
          var fields = _this2.state.fields;

          // 无 name 值

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

          // 验证并获得结果

          var _validateField = _this2.validateField({ name: name, value: value }),
              result = _validateField.result,
              error = _validateField.error;

          // 设置值


          _this2.setState({
            fields: _extends({}, fields, _defineProperty({}, name, {
              value: theValue,
              result: result,
              message: error ? error.message : null
            }))
          });

          // callback
          if (onChange) {
            onChange(e);
          }
        };

        this.handleValidate = function () {
          // 验证
          _this2.validateFields();
          var fields = _this2.state.fields;

          return Object.keys(fields).every(function (name) {
            return fields[name].result === true;
          });
        };
      }, _temp
    );
  };
};
//# sourceMappingURL=FormControl.js.map