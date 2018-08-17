# react-validate-framework

A lightweight and extensible React validation component

[![npm](https://img.shields.io/npm/v/react-validate-framework.svg?style=flat-square)](https://www.npmjs.com/package/react-validate-framework)
[![travis-ci](https://travis-ci.org/MinJieLiu/react-validate-framework.svg?branch=master)](https://travis-ci.org/MinJieLiu/react-validate-framework)
[![Coverage Status](https://coveralls.io/repos/github/MinJieLiu/react-validate-framework/badge.svg?branch=master)](https://coveralls.io/github/MinJieLiu/react-validate-framework?branch=master)
[![npm](https://img.shields.io/npm/dt/react-validate-framework.svg?style=flat-square)](https://github.com/MinJieLiu/react-validate-framework)

[中文 README](README-zh_CN.md)

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
    rules: 'required | isEmail | maxLength(32) | validateFromServer',
    messages: 'Can not be empty! | Please enter a valid email address. | Can not exceed {{param}} characters. | | The email already exists.',
  },
  hobby: {
    rules: 'requiredField(phone) | selectLimit(2)',
    messages: 'email and hobby at least one entry! | Select at least {{param}}.',
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

The BasicForm like this:

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

Validate methods can refer to [validate-framework-utils](https://github.com/MinJieLiu/validate-framework-utils)

### Form components

 * `Checkbox`
 * `Radio`
 * `Select`
 * `Text`
 * `Textarea`
 * `Message`

The `name` attribute is required in form components, `delay` debounce, Other parameters can be overridden.

Of course, you can also use unencapsulated form components, just specify `value` and` onChange` on the line:

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
    placeholder="Please input your email"
  />
);
```

### API

#### Form params

| name | type | return | setState | description |
| :--- | :--- | :--- | :--- | :--- |
| fields | Object | | | The collection of fields |
| isAllValid | Boolean | | | Gets the global validation status |
| formValues | Object | | | Gets a list of form values |
| init | function | | this | Initializes the form value and classes |
| initClassNames | function | this | false | Initializes classes |
| onFormChange | function | | true | Form change event listener |
| changeValues | function | this | true | Customize to change the values |
| validate | function | Promise => Boolean | true | Validate all fields |
| validateByNames | function | Promise => Boolean | true | Validate the component through names |
| addValues | function | this | true | Add one or more value |
| removeValues | function | this | true | Remove one or more value, If there is no name, it will all be removed |
| resetValues | function | this | true | Reset one or more value, If there is no name, it will all be init |
| addSchemas | function | this | false | Add one or more validation rules |
| removeSchemas | function | this | true | Remove one or more validation rules, If there is no name, it will all be removed |
| formDidChange | function | | | Callback |

You can invoke the `changeValues` method to simulate a form change event.

### Update log

0.15.x

 * Remove the `delay` parameter from `FormControl`.
 * Add the `delay` parameter to the `props` of the form component.
