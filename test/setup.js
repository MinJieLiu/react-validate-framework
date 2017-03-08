/**
 * Tests
 */

import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { shallow, render, mount } from 'enzyme';
import './jsdom';
import {
  TextApp1,
  TextApp2,
  TextApp3,
} from './TestApp';

describe('Test to create a basic form', () => {

  it('The form is rendered correctly', () => {
    const app = shallow(
      <TextApp1 values={{ email: '' }} />,
    );
    expect(app.exists()).to.equal(true);
    expect(app.node.props.formControl).to.be.an.instanceOf(Object);
    expect(app.node.props.formControl.formValues.email).to.be.empty;
  });

  it('The form attribute is correct', () => {
    const app = render(
      <TextApp1 values={{ email: '' }} />,
    );
    const item = app.find('#email');
    expect(item.attr('name')).to.equal('email');
    expect(item.attr('id')).to.equal('email');
  });

});


describe('Test Form change validation', () => {

  it('The form is validated correctly', () => {
    const app = mount(
      <TextApp2
        classNames={{
          static: 'form-control',
          success: 'valid-success',
          error: 'valid-error',
        }}
        values={{ email: '' }}
      />,
    );
    const input = app.find('input');
    const label = app.find('label');

    expect(label.text()).to.be.empty;
    // trigger
    input.simulate('change');
    expect(input.props().className).to.contains('valid-error');
    expect(label.text()).to.equal('Can not be empty!');
    expect(app.node.formValues.email).to.be.empty;
    // Change
    input.get(0).value = 'example#example.com';
    input.simulate('change');
    expect(label.text()).to.equal('Please enter a valid email address.');
    expect(app.node.validate()).to.equal(false);
    expect(app.node.isAllValid).to.equal(false);
    // Change
    input.get(0).value = 'example@example.com';
    input.simulate('change');
    expect(label.text()).to.be.empty;
    expect(input.props().className).to.contains('valid-success');
    expect(app.node.validate()).to.equal(true);
    expect(app.node.isAllValid).to.equal(true);
  });

  it('API is executed correctly', () => {
    const app = mount(
      <TextApp2
        classNames={{
          static: 'form-control',
          success: 'valid-success',
          error: 'valid-error',
        }}
        values={{ email: '' }}
      />,
    );
    // init
    app.node.init({ email2: '' });
    expect(app.node.formValues).to.have.property('email2');
    expect(app.node.validateByNames('email2')).to.equal(true);
    // add fields
    app.node.addFields({ email3: { value: '123#123.com' } });
    expect(app.node.formValues).to.have.property('email3');
    expect(app.node.validate()).to.equal(false);
    expect(app.node.validateByNames('email3')).to.equal(true);
    // add schemas
    app.node.addSchemas({ email4: { rules: 'isEmail' } });
    app.node.addFields({ email4: { value: '123#123.com' } });
    expect(app.node.validate()).to.equal(false);
    expect(app.node.validateByNames('email4')).to.equal(false);
    // change values
    app.node.changeValues({ email: '123@123.com', email4: '123@123.com' });
    expect(app.node.validateByNames('email')).to.equal(true);
    expect(app.node.validate()).to.equal(true);
  });

});


describe('Test all types of forms', () => {

  it('The all types of form is validated correctly', () => {
    const app = mount(
      <TextApp3
        classNames={{
          static: 'form-control',
          success: 'valid-success',
          error: 'valid-error',
        }}
        values={{
          hobby: ['1'],
          sex: '',
          city: '',
          remarks: '',
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
    expect(app.node.validate()).to.equal(true);
  });

});
