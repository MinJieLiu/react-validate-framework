/**
 * Tests
 */

import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import {
  TextApp1,
  TextApp2,
  TextApp3,
} from './TestApp';

describe('Test to create a basic form', () => {

  it('The form is rendered correctly', () => {
    const item = shallow(<TextApp1 />);
    expect(item.exists()).to.equal(true);
    expect(item.node.props.formControl).to.be.an.instanceOf(Object);
  });

});
