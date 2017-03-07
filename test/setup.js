/**
 * Tests
 */

import React from 'react';
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
    expect(app.node.isAllValid).to.equal(false);
    // Change
    input.get(0).value = 'example@example.com';
    input.simulate('change');
    expect(label.text()).to.be.empty;
    expect(input.props().className).to.contains('valid-success');
    expect(app.node.isAllValid).to.equal(true);
  });

  // it('Initialize the parameter by function', () => {});
});
