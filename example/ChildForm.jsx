/**
 * Created by MingYi on 2016/12/23.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Message,
} from '../src';
import './ChildForm.scss';

class ChildForm extends Component {

  static propTypes = {
    formControl: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    // Initializes the values
    const { formControl } = props;
    formControl.init({
      url: '',
    });
  }

  handleAddFriends = () => {
    const { formControl } = this.props;
    formControl.addSchemas({
      friend: {
        rules: 'required',
        messages: 'Can not be empty!',
      },
    }).addValues({
      friend: '',
    });
  };

  handleDeleteFriend = () => {
    const { formControl } = this.props;
    formControl.removeSchemas('friend').removeValues('friend');
  };

  render() {
    const {
      formControl: {
        fields,
        onFormChange,
      },
    } = this.props;

    return (
      <div className="child-form">
        <h3>ChildForm</h3>
        <div className="form-group">
          <label htmlFor="money">Money:</label>
          <Text
            id="money"
            name="money"
            type="text"
            placeholder="Please enter money"
          />
          <Message className="valid-error-message" name="money" />
        </div>
        <div className="form-group">
          <button
            className="btn btn-default"
            onClick={fields.friend ? this.handleDeleteFriend : this.handleAddFriends}
          >
            {fields.friend ? 'Delete a friend' : 'Add a friend'}
          </button>
        </div>
        {
          fields.friend ? (
            <div className="form-group">
              <label htmlFor="friend">Name:</label>
              <Text
                id="friend"
                name="friend"
                type="text"
                placeholder="Please enter a name"
              />
              <Message className="valid-error-message" name="friend" />
            </div>
          ) : null
        }
        <div className="form-group">
          {/* The unencapsulated form components */}
          <label htmlFor="url">Url:</label>
          <input
            className={fields.url.className}
            id="url"
            name="url"
            type="text"
            onChange={onFormChange}
            value={fields.url.value}
            placeholder="Please enter a URL"
          />
          <em className="valid-error-message">{fields.url.message}</em>
        </div>
      </div>
    );
  }
}

export default ChildForm;
