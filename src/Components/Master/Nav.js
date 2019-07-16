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
    return (
      <React.Fragment>
        <Link to="/">Home</Link>
        <Link to="/newNote">New Note</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/tags">Tags</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      </React.Fragment>
    );
  };

  const guestLinks = () => {
    return (
      <React.Fragment>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/tags">Tags</Link>
      </React.Fragment>
    );
  };

  return <nav id="main-nav">{props.username ? userLinks() : guestLinks()}</nav>;
};

const mapStateToProps = state => state.currentUser;

const mapDispatchToProps = dispatch => ({
  dispatchLogout: () => dispatch(logouUserAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
