import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logouUserAction } from '../../Redux/actions/UserActions';

const Nav = props => {
  const handleLogout = () => {
    localStorage.clear();
    props.dispatchLogout();
  };

  const userLinks = () => {
    if (props.username) {
      return (
        <React.Fragment>
          <Link to="/profile">Profile</Link>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </React.Fragment>
      );
    }
  };

  return (
    <nav id="main-nav">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/newNote">New Note</Link>
      <Link to="/notes">Notes</Link>
      {userLinks()}
    </nav>
  );
};

const mapStateToProps = state => state.currentUser;

const mapDispatchToProps = dispatch => ({
  dispatchLogout: () => dispatch(logouUserAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
