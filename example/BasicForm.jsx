/**
 * Created by MingYi on 2016/12/23.
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import formConnect from '../src';
import './BasicForm.scss';
import ChildForm from './ChildForm';

// Rules and messages
const schemas = {
  email: {
    rules: 'required | isEmail | maxLength(32)',
    messages: 'Can not be empty! | Please enter a valid email address. | Can not exceed {{param}} characters.',
  },
  phone: {
    rules: 'isPhone',
    messages: 'Mobile: {{value}} is not valid.',
  },
  birthday: {
    rules: 'required | isDate',
    messages: 'Can not be empty! | Please enter a valid date.',
  },
  sex: {
    rules: 'required',
    messages: 'Can not be empty!',
  },
  city: {
    rules: 'required',
    messages: 'Can not be empty!',
  },
  hobby: {
    rules: 'required | selectLimit(3)',
    messages: 'Can not be empty! | Select at least {{param}}.',
  },
  remarks: {
    rules: 'minLength(10) | maxLength(60)',
    messages: 'Can not be less than {{param}} characters. | Can not exceed {{param}} characters.',
  },
  money: {
    rules: 'required | isNumeric | maxLength(5)',
    messages: 'Can not be empty! | Please enter an integer amount. | Can not exceed {{param}} characters.',
  },
  url: {
    rules: 'isUrl',
    messages: 'Please enter the link address.',
  },
};

// Custom methods
const methods = {
  selectLimit(field, param) {
    if (Array.isArray(field.value)) {
      return field.value.length >= param;
    }
    return false;
  },
};

class BasicForm extends Component {

  static propTypes = {
    fields: PropTypes.object,
    formValues: PropTypes.object,
    isAllValid: PropTypes.bool,
    onChange: PropTypes.func,
    validate: PropTypes.func,
    removeSchemas: PropTypes.func,
  };

  handleSubmitClick = () => {
    const { validate } = this.props;
    // @return {Boolean}
    validate();
  };

  render() {
    const {
      fields,
      onChange,
      formValues,
      isAllValid,
      removeSchemas,
    } = this.props;

    return (
      <div className="container">
        <h3>BasicForm</h3>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            className={fields.email.className}
            id="email"
            name="email"
            type="email"
            onChange={onChange}
            value={fields.email.value}
            placeholder="Please input your email"
          />
          <em className="valid-error-message">{fields.email.message}</em>
        </div>
        <div className="form-group">
          <button
            className="btn btn-default"
            type="button"
            onClick={() => {
              removeSchemas('email');
            }}
          >
            Do not validate the email
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            className={fields.phone.className}
            id="phone"
            name="phone"
            type="text"
            onChange={onChange}
            value={fields.phone.value}
            placeholder="Please enter phone number"
          />
          <em className="valid-error-message">{fields.phone.message}</em>
        </div>
        <div className="form-group">
          <label htmlFor="birthday">Birthday:</label>
          <input
            className={fields.birthday.className}
            id="birthday"
            name="birthday"
            type="text"
            onChange={onChange}
            value={fields.birthday.value}
            placeholder="Please fill in your birthday"
          />
          <em className="valid-error-message">{fields.birthday.message}</em>
        </div>
        <div className="form-group">
          <label htmlFor="male">Sex:</label>
          <div className="radio">
            <label htmlFor="male">
              <input
                id="male"
                type="radio"
                name="sex"
                onChange={onChange}
                checked={fields.sex.value === '0'}
                value="0"
              />
              male
            </label>
            <label htmlFor="female">
              <input
                id="female"
                type="radio"
                name="sex"
                onChange={onChange}
                checked={fields.sex.value === '1'}
                value="1"
              />
              female
            </label>
          </div>
          <em className="valid-error-message">{fields.sex.message}</em>
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <select
            className={fields.city.className}
            id="city"
            name="city"
            onChange={onChange}
            value={fields.city.value}
          >
            <option value="">Please choose</option>
            <option value="0">beijing</option>
            <option value="1">shanghai</option>
            <option value="2">new York</option>
          </select>
          <em className="valid-error-message">{fields.city.message}</em>
        </div>
        <div className="form-group">
          <label htmlFor="hobby">Hobby:</label>
          <div className="checkbox">
            <label htmlFor="hobby1">
              <input
                id="hobby1"
                name="hobby"
                type="checkbox"
                onChange={onChange}
                checked={fields.hobby.value.indexOf('1') !== -1}
                value="1"
              />
              hobby1
            </label>
            <label htmlFor="hobby2">
              <input
                id="hobby2"
                name="hobby"
                type="checkbox"
                onChange={onChange}
                checked={fields.hobby.value.indexOf('2') !== -1}
                value="2"
              />
              hobby2
            </label>
            <label htmlFor="hobby3">
              <input
                id="hobby3"
                name="hobby"
                type="checkbox"
                onChange={onChange}
                checked={fields.hobby.value.indexOf('3') !== -1}
                value="3"
              />
              hobby3
            </label>
            <label htmlFor="hobby4">
              <input
                id="hobby4"
                name="hobby"
                type="checkbox"
                onChange={onChange}
                checked={fields.hobby.value.indexOf('4')}
                value="4"
              />
              hobby4
            </label>
          </div>
          <em className="valid-error-message">{fields.hobby.message}</em>
        </div>
        <div className="form-group">
          <label htmlFor="remarks">Introduction:</label>
          <textarea
            className={fields.remarks.className}
            id="remarks"
            name="remarks"
            rows="3"
            onChange={onChange}
            value={fields.remarks.value}
            placeholder="Describe yourself"
          />
          <em className="valid-error-message">{fields.remarks.message}</em>
        </div>
        <ChildForm {...this.props} />
        <input
          className={classNames('btn', {
            'btn-primary': !isAllValid,
            'btn-success': isAllValid,
          })}
          id="submit"
          type="button"
          onClick={this.handleSubmitClick}
          value={isAllValid ? 'Success' : 'Commit'}
        />
        <div className="well-sm">
          <p>Form Values:</p>
          {JSON.stringify(formValues)}
        </div>
      </div>
    );
  }
}

export default formConnect(schemas, methods)(BasicForm);
