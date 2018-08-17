# react-validate-framework

一个轻量、简单、易用的 `React` 表单验证组件

[![npm](https://img.shields.io/npm/v/react-validate-framework.svg?style=flat-square)](https://www.npmjs.com/package/react-validate-framework)
[![travis-ci](https://travis-ci.org/MinJieLiu/react-validate-framework.svg?branch=master)](https://travis-ci.org/MinJieLiu/react-validate-framework)
[![Coverage Status](https://coveralls.io/repos/github/MinJieLiu/react-validate-framework/badge.svg?branch=master)](https://coveralls.io/github/MinJieLiu/react-validate-framework?branch=master)
[![npm](https://img.shields.io/npm/dt/react-validate-framework.svg?style=flat-square)](https://github.com/MinJieLiu/react-validate-framework)

Demo: [https://minjieliu.github.io/react-validate-framework](https://minjieliu.github.io/react-validate-framework)

### 特性

 1. 轻量的体积
 1. 亲和的 API
 1. 内置常用验证方法
 1. 动态的验证
 1. 多表单组合
 1. 自定义规则
 1. 基于 `async` 语法，优雅的异步验证


## 开始使用

    npm i react-validate-framework --save

引入:

```js
import formConnect, {
  Checkbox,
  Radio,
  Select,
  Text,
  Textarea,
  Message,
} from 'react-validate-framework';
```

验证规则像这样：

```js
const schemas = {
  email: {
    rules: 'required | isEmail | maxLength(32) | validateFromServer',
    messages: '不能为空 | 请输入有效的电子邮件地址 | 不能超过{{param}}个字符 | 邮箱被占用',
  },
  hobby: {
    rules: 'requiredField(email) | selectLimit(2)',
    messages: '邮件和爱好至少填写一项 | 至少选择{{param}}项',
  },
};

const methods = {
  selectLimit(field, param) {
    if (Array.isArray(field.value)) {
      return field.value.length >= param;
    }
    return false;
  },
  requiredField(field, param) {
    const otherField = this.fields[param];
    return this.required(field) || (otherField.result && this.required(otherField));
  },
  async validateFromServer(field, param) {
    return await doServerAPI();
  },
};
```

 * 验证规则和扩展方法不是必需

表单：

```js
@formConnect(schemas, methods)
export default class BasicForm extends React.Component {
  static propTypes = {
    formControl: PropTypes.object,
  };

  constructor(props) {
    super(props);
    props.formControl.init({
      email: '',
      phone: '',
    }, {
      static: 'form-control',
      success: 'valid-success',
      error: 'valid-error',
    });
  }

  handleSubmit = async () => {
    const { formControl } = this.props;
    if (await formControl.validate()) {
      // Submit.
    }
  };

  render() {
    return (
      <div className="form-group">
        <Text
          name="email"
          placeholder="Please input your email"
          delay={100} // Asynchronous validation
        />
        <Message className="valid-error-message" name="email" />
        <Text name="phone" />
        <button onClick={this.handleSubmit}>提交</button>
      </div>
    );
  }
}
```

基础验证方法可以参考 [validate-framework-utils](https://github.com/MinJieLiu/validate-framework-utils)

### 表单组件

 * `Checkbox`
 * `Radio`
 * `Select`
 * `Text`
 * `Textarea`
 * `Message`

表单域 `name` 属性是必需的，`delay` 为验证防抖（有异步验证时为必需），其他参数可以被覆盖。

当然，你也可以使用自定义的表单受控组件，只需指定 `value` 和 `onChange`：

```js
const {
  formControl: {
    fields,
    onFormChange,
  },
} = this.props;

return (
  <input
    className={fields.email.className}
    name="email"
    type="text"
    onChange={onFormChange}
    value={fields.email.value}
    placeholder="请输入电子邮件"
  />
);
```

### API

#### Form params

| 名称 | 类型 | 返回值 | setState | 描述 |
| :--- | :--- | :--- | :--- | :--- |
| fields | Object | | | `fields` 集合 |
| isAllValid | Boolean | | | 全局验证状态 |
| formValues | Object | | | 表单值的列表 |
| init | function | this | false | 初始化表单值和类 |
| initClassNames | function | this | false | 初始化类 |
| onFormChange | function | | true | 表单更改事件监听方法 |
| changeValues | function | this | true | 自定义改变表单方法 |
| validate | function | Promise => Boolean | true | 验证所有字段 |
| validateByNames | function | Promise => Boolean | true | 通过 `name` 验证组件 |
| addValues | function | this | true | 添加一个或多个值 |
| removeValues | function | this | true | 删除一个或多个值，无参数则删除所有 |
| resetValues | function | this | true | 重置一个或多个值，无参数则重置所有 |
| addSchemas | function | this | false | 添加一个或多个验证规则 |
| removeSchemas | function | this | true | 删除一个或多个验证规则，无参数则删除所有 |
| formDidChange | function | | | 表单改变回调 |

### 更新日志

0.15.x

 * 移除 `FormControl` 中的 `delay` 参数
 * 表单组件的 `props` 中添加 `delay` 参数
