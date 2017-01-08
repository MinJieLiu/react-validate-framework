# react-validate-framework

A lightweight and extensible React validation component

[![npm](https://img.shields.io/npm/v/react-validate-framework.svg?style=flat-square)](https://www.npmjs.com/package/react-validate-framework)
[![npm](https://img.shields.io/npm/dt/react-validate-framework.svg?style=flat-square)](https://github.com/MinJieLiu/react-validate-framework)

This component relies on `react`.

Demo: [https://minjieliu.github.io/react-validate-framework](https://minjieliu.github.io/react-validate-framework)

You can check out the code to see examples.

## How to use?

    npm i react-validate-framework --save

Import:

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

Rules and messages like this:

```js
const schemas = {
  email: {
    rules: 'required | isEmail | maxLength(32)',
    messages: 'Can not be empty! | Please enter a valid email address. | Can not exceed {{param}} characters.',
  },
  hobby: {
    rules: 'required | selectLimit(2)',
    messages: 'Can not be empty! | Select at least {{param}}.',
  },
};

const methods = {
  selectLimit(field, param) {
    if (Array.isArray(field.value)) {
      return field.value.length >= param;
    }
    return false;
  },
};
```

The BasicForm like this:

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

Export the module:

```js
export default formConnect(schemas, methods)(BasicForm);
```

Finally, sets the initialized value

```js
<BasicForm
  ref={(ref) => {
    this.basicForm = ref;
  }}
  classNames={{
    static: 'form-control',
    success: 'valid-success',
    error: 'valid-error',
  }}
  values={this.state.formValues}
/>

// The formValues like this { email: '', hobby: ['2'] },
```

The `name` attribute is required in all input components

Validate methods can refer to `validate-framework-utils`

### Form components

 * `Checkbox`
 * `Radio`
 * `Select`
 * `Text`
 * `Textarea`
 * `Message`

### API

#### FormControl params

| name | type | required | default | description |
| :--- | :--- | :--- | :--- | :--- |
| values | Object | true | | Key-value pairs for `name` and` value` |
| classNames | Object | false | {} | Its `key` value contains` static`, `success`,` error` |

#### Form params

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| fields | Object | | The collection of fields |
| isAllValid | Boolean | | Gets the global validation status |
| formValues | Object | | Gets a list of form values |
| onChange | function | | Form change event listener |
| operateChange | function | | Customize to change the field |
| validate | function | | Validate all fields |
| validateByNames | function | | Validate the component through names |
| addFields | function | | Add one or more fields |
| removeFields | function | | Deletes one or more fields |
| addSchemas | function | | Add one or more validation rules |
| removeSchemas | function | | Delete one or more validation rules |
