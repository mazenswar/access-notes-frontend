import React from 'react';
import { connect } from 'react-redux';
import '../stylesheets/welcome.scss';

const Welcome = props => {
  const { username } = props;
  return (
    <div className="welcome-container">
      <h1>Welcome {username}</h1>
    </div>
  );
};

const mapStateToProps = state => state.currentUser;
export default connect(
  mapStateToProps,
  null
)(Welcome);
