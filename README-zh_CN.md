# react-validate-framework

一个轻量、简单、易用的 `React` 表单验证组件

[![npm](https://img.shields.io/npm/v/react-validate-framework.svg?style=flat-square)](https://www.npmjs.com/package/react-validate-framework)
[![travis-ci](https://travis-ci.org/MinJieLiu/react-validate-framework.svg?branch=master)](https://travis-ci.org/MinJieLiu/react-validate-framework)
[![npm](https://img.shields.io/npm/dt/react-validate-framework.svg?style=flat-square)](https://github.com/MinJieLiu/react-validate-framework)

Demo: [https://minjieliu.github.io/react-validate-framework](https://minjieliu.github.io/react-validate-framework)

### 特性

 1. 轻量的体积
 1. 亲和的 API
 1. 内置常用验证方法
 1. 动态的验证
 1. 多表单组合
 1. 自定义规则


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
    rules: 'required | isEmail | maxLength(32)',
    messages: '不能为空 | 请输入有效的电子邮件地址 | 不能超过{{param}}个字符',
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
};
```

 * 验证规则和扩展方法不是必需

表单像这样：

```js
const BasicForm = () => (
  <div className="form-group">
    <Text
      name="email"
      placeholder="Please input your email"
    />
    <Message className="valid-error-message" name="email" />
  </div>
);
```

 * 组件中 `name` 为必需值

导出模块：

```js
export default formConnect(schemas, methods)(BasicForm);
```

最后，初始化表单值和类名：

```js
<BasicForm
  classNames={{
    static: 'form-control',
    success: 'valid-success',
    error: 'valid-error',
  }}
  values={this.state.formValues}
/>
```


 * `values` 的值类似于 { email: '', hobby: ['2'] }
 * 这些参数也可以在 `BasicForm` 中使用 `init` 方法初始化

基础验证方法可以参考 [validate-framework-utils](https://github.com/MinJieLiu/validate-framework-utils)

### 表单组件

 * `Checkbox`
 * `Radio`
 * `Select`
 * `Text`
 * `Textarea`
 * `Message`

表单 `name` 属性是必需的，其他参数可以被覆盖。

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

#### `FormControl` 参数

| 名称 | 类型 | 必需 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- | :--- |
| values | Object | false | | `values` 集合 |
| classNames | Object | false | {} | 其 key 值包含 `static`，`success`，`error` 三种类名 |

#### Form params

| 名称 | 类型 | 默认值 | setState | 描述 |
| :--- | :--- | :--- | :--- | :--- |
| fields | Object | | | `fields` 集合 |
| isAllValid | Boolean | | | 全局验证状态 |
| formValues | Object | | | 表单值的列表 |
| init | function | | false | 初始化表单值和类 |
| onFormChange | function | | true | 表单更改事件监听方法 |
| changeValues | function | | true | 自定义改变表单方法 |
| validate | function | | true | 验证所有字段 |
| validateByNames | function | | true | 通过 `name` 验证组件 |
| addValues | function | | true | 添加一个或多个值 |
| removeValues | function | | true | 删除一个或多个值 |
| addSchemas | function | | false | 添加一个或多个验证规则 |
| removeSchemas | function | | true | 删除一个或多个验证规则 |
| formDidChange | function | | | 回调函数 |
