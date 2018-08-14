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
  TestApp5,
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

  it('API resetValues executed correctly', async () => {
    const app = mount(
      <TestApp3 />,
    );
    // change values
    app.node.changeValues({ sex: '1', city: '1', remarks: 'hello', hobby: ['1'] });
    expect(await app.node.validateByNames('city', 'remarks')).to.equal(true);
    expect(await app.node.validate()).to.equal(true);
    app.node.resetValues('remarks');
    expect(await app.node.validateByNames('remarks')).to.not.equal(true);
    expect(await app.node.formValues.remarks).to.be.empty;
    // reset all
    app.node.resetValues();
    expect(await app.node.formValues.hobby.length).to.be.equal(0);
    expect(await app.node.formValues.city).to.be.empty;
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
    app.find('#hobby3').simulate('change');
    expect(app.node.formValues.hobby.indexOf('3') === -1).to.equal(true);
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

  it('The Wrap data is correctly', async () => {
    class WrapTest extends React.Component {
      state = {
        globalValues: {
          hobby: ['1'],
          city: 1,
          other: 1,
          dog: 5,
        },
      };

      handleChangeValues = () => {
        this.setState({
          globalValues: {
            ...this.state.globalValues,
            city: 2,
            money: 1000,
          },
        });
      };

      render() {
        return (
          <div>
            <button id="changeButton" onClick={this.handleChangeValues}>click</button>
            <TestApp3
              classNames={{
                static: 'form-control',
                success: 'valid-success',
                error: 'valid-error',
              }}
              values={this.state.globalValues}
            />
          </div>
        );
      }
    }
    const wrapper = mount(
      <WrapTest />,
    );
    const app = wrapper.find(TestApp3);
    expect(app.node.formValues.city).to.equal('1');
    // number
    app.node.init({ love: 520 });
    expect(app.node.fields.love.value).to.equal('520');

    // change
    wrapper.find('#changeButton').simulate('click');
    await sleep(5);
    expect(app.node.formValues.city).to.equal('2');
    expect(app.node.fields.money.value).to.equal('1000');

    // removeValues
    app.node.removeValues('love', 'money');
    expect(app.node.fields.love).to.equal(undefined);
    expect(app.node.fields.money).to.equal(undefined);
    expect(app.node.formValues.city).to.not.be.empty;
    // remove all others
    app.node.removeValues();
    expect(app.node.fields.other).to.be.empty;
    expect(app.node.fields.dog).to.be.empty;
    expect(wrapper.node.state.globalValues.other).to.be.empty;
    expect(wrapper.node.state.globalValues.dog).to.be.empty;
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

describe('Test Asynchronous forms', () => {

  it('The Asynchronous form is rendered correctly', () => {
    const app = mount(
      <TestApp5 />,
    );
    const username = app.find('#username');
    expect(username.props().name).to.equal('username');
    expect(username.props().className).to.contains(' ');
    expect(app.node.fields).to.have.property('username');
    expect(app.node.fields.username).to.have.property('delayFunc');
    expect(app.node.schemas).to.have.property('username');
  });

  it('The Asynchronous form is changed correctly', async () => {
    const app = mount(
      <TestApp5 />,
    );
    const username = app.find('#username');
    // change
    username.get('0').value = '123456';
    username.simulate('change');
    await sleep(5);
    expect(app.find('#usernameMessage').text()).to.equal('');
    await sleep(1205);
    expect(app.find('#usernameMessage').text()).to.equal('The username already exists.');
    // change
    app.node.changeValues({ username: '1234567' });
    expect(app.node.formValues.username).to.equal('1234567');
    await sleep(1205);
    expect(app.node.isAllValid).to.equal(true);
  });

});
