/**
 * TestApp
 */

/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formConnect, {
  Checkbox,
  Radio,
  Select,
  Text,
  Textarea,
  Message,
} from '../src';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


export const TestApp1 = formConnect()(() => (
  <Text name="email" id="email" />
));


export const TestApp2 = formConnect({
  email: {
    rules: 'required | isEmail',
    messages: 'Can not be empty! | Please enter a valid email address.',
  },
})(() => (
  <section>
    <Text name="email" />
    <Message name="email" />
  </section>
));


export const TestApp3 = formConnect({
  hobby: {
    rules: 'required',
    messages: 'Can not be empty!',
  },
  sex: {
    rules: 'required',
    messages: 'Can not be empty!',
  },
  city: {
    rules: 'required',
    messages: 'Can not be empty!',
  },
  remarks: {
    rules: 'required',
    messages: 'Can not be empty!',
  },
})(() => (
  <section>
    <Checkbox name="hobby" id="hobby1" value="1" />
    <Checkbox name="hobby" id="hobby2" value="2" />
    <Checkbox name="hobby" id="hobby3" value="3" />
    <Message name="hobby" />
    <Radio name="sex" id="sex1" value="1" />
    <Radio name="sex" id="sex2" value="2" />
    <Message name="sex" />
    <Select name="city">
      <option value="">option1</option>
      <option value="1">option2</option>
    </Select>
    <Message name="city" />
    <Textarea name="remarks" id="remarks" />
    <Message name="remarks" />
  </section>
));


export class TestChildApp extends Component {

  static propTypes = {
    formControl: PropTypes.object,
  };

  constructor(props) {
    super(props);
    props.formControl.addSchemas({
      birthday: {
        rules: 'isDate',
        messages: 'Please enter a valid date.',
      },
    });
  }

  componentWillMount() {
    this.props.formControl.init({ birthday: '' });
  }

  componentWillUnmount() {
    this.props.formControl.removeValues('birthday');
  }

  render() {
    return (
      <section>
        <Text name="birthday" />
        <Message name="birthday" />
      </section>
    );
  }
}


export const TestApp4 = formConnect({
  phone: {
    rules: 'isPhone',
    messages: 'Mobile: {{value}} is not valid.',
  },
})(
  class extends Component {

    static propTypes = {
      formControl: PropTypes.object,
    };

    constructor(props) {
      super(props);
      props.formControl.init({
        phone: '',
      }, {
        static: 'form-control',
        success: 'valid-success',
        error: 'valid-error',
      });
    }

    render() {
      return (
        <div>
          <section>
            <Text name="phone" id="phone" />
            <Message name="phone" id="phoneMessage" />
          </section>
          <TestChildApp {...this.props} />
        </div>
      );
    }
  },
);

export const TestApp5 = formConnect({
  username: {
    rules: 'remoteRule',
    messages: 'The username already exists.',
  },
}, {
  async remoteRule(field) {
    await sleep(1000);
    if (field.value) {
      return field.value !== '123456';
    }
    return false;
  },
})(
  class extends Component { // eslint-disable-line

    render() {
      return (
        <div>
          <Text name="username" id="username" delay={200} />
          <Message name="username" id="usernameMessage" />
        </div>
      );
    }
  },
);
