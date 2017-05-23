/**
 * Tests
 */

import React from 'react';
import 'babel-polyfill';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { shallow, render, mount } from 'enzyme';
import './jsdom';
import {
  TestApp1,
  TestApp2,
  TestApp3,
  TestApp4,
} from './TestApp';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('Test to create a basic form', () => {

  it('The form is rendered correctly', () => {
    const app = shallow(
      <TestApp1 />,
    );
    expect(app.exists()).to.equal(true);
    expect(app.node.props.formControl).to.be.an.instanceOf(Object);
    expect(app.node.props.formControl.formValues.email).to.be.empty;
  });

  it('The form attribute is correct', () => {
    const app = render(
      <TestApp1 />,
    );
    const item = app.find('#email');
    expect(item.attr('name')).to.equal('email');
    expect(item.attr('id')).to.equal('email');
  });

});


describe('Test Form change validation', () => {

  it('The form is validated correctly', async () => {
    const app = mount(
      <TestApp2
        classNames={{
          static: 'form-control',
          success: 'valid-success',
          error: 'valid-error',
        }}
      />,
    );
    const input = app.find('input');
    const label = app.find('label');

    expect(label.text()).to.be.empty;
    // trigger
    input.simulate('change');
    await sleep(5);
    expect(input.props().className).to.contains('valid-error');
    expect(label.text()).to.equal('Can not be empty!');
    expect(app.node.formValues.email).to.be.empty;
    // Change
    input.get(0).value = 'example#example.com';
    input.simulate('change');
    await sleep(5);
    expect(label.text()).to.equal('Please enter a valid email address.');
    expect(await app.node.validate()).to.equal(false);
    expect(app.node.isAllValid).to.equal(false);
    // Change
    input.get(0).value = 'example@example.com';
    input.simulate('change');
    await sleep(5);
    expect(label.text()).to.be.empty;
    expect(input.props().className).to.contains('valid-success');
    expect(await app.node.validate()).to.equal(true);
    expect(app.node.isAllValid).to.equal(true);
  });

  it('API is executed correctly', async () => {
    const app = mount(
      <TestApp2 />,
    );
    // init
    app.node.init({ email2: '' });
    app.node.initClassNames({
      static: 'form-control',
      success: 'valid-success',
      error: 'valid-error',
    });
    expect(app.node.formValues).to.have.property('email2');
    expect(await app.node.validateByNames('email2')).to.equal(true);
    // add fields
    app.node.addValues({ email3: '123#123.com' });
    expect(app.node.formValues).to.have.property('email3');
    expect(await app.node.validate()).to.equal(false);
    expect(await app.node.validateByNames('email3')).to.equal(true);
    // add schemas
    app.node.addSchemas({ email4: { rules: 'isEmail' } });
    app.node.addValues({ email4: '123#123.com' });
    expect(await app.node.validate()).to.equal(false);
    expect(await app.node.validateByNames('email4')).to.equal(false);
    expect(app.node.fields.email4.className).to.contains('valid-error');
    // change values
    app.node.changeValues({ email: '123@123.com', email4: '123@123.com' });
    expect(await app.node.validateByNames('email')).to.equal(true);
    expect(await app.node.validate()).to.equal(true);
  });

});


describe('Test all types of forms', () => {

  it('The all types of form is validated correctly', async () => {
    const app = mount(
      <TestApp3
        classNames={{
          static: 'form-control',
          success: 'valid-success',
          error: 'valid-error',
        }}
        values={{
          hobby: ['1'],
        }}
      />,
    );
    app.find('#hobby2').simulate('change');
    expect(app.node.formValues.hobby.indexOf('2') !== -1).to.equal(true);
    app.find('#hobby3').simulate('change');
    expect(app.node.formValues.hobby.indexOf('3') !== -1).to.equal(true);
    app.find('#sex2').simulate('change');
    expect(app.node.formValues.sex).to.equal('2');
    app.find('select').get('0').value = '1';
    app.find('select').simulate('change');
    expect(app.node.formValues.city).to.equal('1');
    app.find('#remarks').get('0').value = 'abc';
    app.find('#remarks').simulate('change');
    expect(app.node.formValues.remarks).to.equal('abc');
    expect(await app.node.validate()).to.equal(true);
  });

});

describe('Test nested forms', () => {

  it('The nested form is rendered correctly', () => {
    const app = mount(
      <TestApp4 />,
    );
    const phone = app.find('#phone');
    expect(phone.props().name).to.equal('phone');
    expect(phone.props().className).to.contains('form-control');
    expect(app.node.fields).to.have.property('birthday');
    expect(app.node.fields).to.have.property('birthday');
    expect(app.node.schemas).to.have.property('phone');
    expect(app.node.schemas).to.have.property('birthday');
  });

  it('The nested form is changed correctly', async () => {
    const app = mount(
      <TestApp4 />,
    );
    const phone = app.find('#phone');
    // change
    phone.get('0').value = '123456789';
    phone.simulate('change');
    await sleep(5);
    expect(app.find('#phoneMessage').text()).to.equal('Mobile: 123456789 is not valid.');
    // change
    app.node.changeValues({ phone: '1555555555', birthday: '2010-10-10' });
    expect(app.node.formValues.phone).to.equal('1555555555');
    expect(app.node.formValues.birthday).to.equal('2010-10-10');
    expect(app.node.isAllValid).to.equal(false);
    // removeSchemas
    app.node.removeSchemas('phone');
    await sleep(5);
    expect(app.node.isAllValid).to.equal(true);
  });

});
