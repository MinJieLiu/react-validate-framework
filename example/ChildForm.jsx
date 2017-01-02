/**
 * Created by MingYi on 2016/12/23.
 */

import React, { Component, PropTypes } from 'react';
import './ChildForm.scss';

class ChildForm extends Component {

  static propTypes = {
    fields: PropTypes.object,
    onChange: PropTypes.func,
    addFields: PropTypes.func,
    removeFields: PropTypes.func,
    addSchemas: PropTypes.func,
    removeSchemas: PropTypes.func,
  };

  handleAddFriends = () => {
    const { addFields, addSchemas } = this.props;
    // init value
    addFields({
      friend: {
        value: '',
      },
    });
    addSchemas({
      friend: {
        rules: 'required',
        messages: 'Can not be empty!',
      },
    });
  };

  handleDeleteFriend = () => {
    const { removeFields, removeSchemas } = this.props;
    removeFields(['friend']);
    removeSchemas(['friend']);
  };

  render() {
    const {
      fields,
      onChange,
    } = this.props;

    return (
      <div className="child-form">
        <h3>ChildForm</h3>
        <div className="form-group">
          <label htmlFor="money">Money:</label>
          <input
            className={fields.money.className}
            id="money"
            name="money"
            type="text"
            onChange={onChange}
            value={fields.money.value}
            placeholder="Please enter money"
          />
          <em className="valid-error-message">{fields.money.message}</em>
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
          fields.friend
            ? (
              <div className="form-group">
                <label htmlFor="friend">Name:</label>
                <input
                  className={fields.friend.className}
                  id="friend"
                  name="friend"
                  type="text"
                  onChange={onChange}
                  value={fields.friend.value}
                  placeholder="Please enter a name"
                />
                <em className="valid-error-message">{fields.friend.message}</em>
              </div>
            ) : null
        }
        <div className="form-group">
          <label htmlFor="url">Url:</label>
          <input
            className={fields.url.className}
            id="url"
            name="url"
            type="text"
            onChange={onChange}
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
