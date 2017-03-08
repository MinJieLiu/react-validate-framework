/**
 * TestApp
 */

import React from 'react';
import fromConnect, {
  Checkbox,
  Radio,
  Select,
  Text,
  Textarea,
  Message,
} from '../src';


export const TextApp1 = fromConnect()(() => (
  <Text name="email" id="email" />
));


export const TextApp2 = fromConnect({
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


export const TextApp3 = fromConnect({
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
