/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import { profileNotes } from '../../Helpers/Helpers';
import '../../stylesheets/users/userShow.scss';

const Profile = props => {
  const { user } = props;
  if (user) {
    return (
      <div>
        <img
          className="user-profile-img"
          src={user.img_url}
          alt="user-profile-img"
        />
        <h1>{user.username}</h1>
        <h2>My Notes</h2>
        <ul className="user-show-notes">{profileNotes(user.notes)}</ul>
      </div>
    );
  }
  return null;
};

const mapStateToProps = state => ({ user: state.currentUser });

export default connect(
  mapStateToProps,
  null
)(Profile);
