/**
 * Tests
 */

import React from 'react';
import { expect } from 'chai';
import { shallow, render, mount } from 'enzyme';
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
