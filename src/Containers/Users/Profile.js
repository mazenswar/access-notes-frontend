/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import '../../stylesheets/users/userShow.scss';

const Profile = props => {
  const { img_url, username } = props;
  return (
    <div>
      <img className="user-profile-img" src={img_url} alt="user-profile-img" />
      <h1>{username}</h1>
    </div>
  );
};

const mapStateToProps = state => state.currentUser;

export default connect(
  mapStateToProps,
  null
)(Profile);
