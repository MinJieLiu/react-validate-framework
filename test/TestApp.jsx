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
})(() => (
  <section>
    <Checkbox name="hobby" id="hobby1" />
    <label htmlFor="hobby1">hobby1</label>
    <Checkbox name="hobby" id="hobby2" />
    <label htmlFor="hobby2">hobby1</label>
    <Message name="hobby" />
  </section>
));
