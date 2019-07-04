import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

// Containers
import Home from '../Containers/Home';
import LoginContainer from '../Containers/Login/LoginContainer';
import SignUpContainer from '../Containers/SignUp/SignUpContainer';
import AllNotes from '../Containers/Notes/AllNotes';
import Profile from '../Containers/Users/Profile';
import NewNote from '../Containers/Notes/NewNote';
import ShowNote from '../Containers/Notes/ShowNote';
import ShowTagPage from '../Containers/Notes/ShowTagPage';

const RouterComp = props => {
  const { username } = props;
  // conditional routing
  const profileRoute = () =>
    username ? <Route path="/profile" component={Profile} /> : null;

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/signup" component={SignUpContainer} />
      <Route path="/newNote" component={NewNote} />
      <Route exact path="/notes" component={AllNotes} />
      {profileRoute()}
      <Route exact path="/notes/:id" component={ShowNote} />
      <Route exact path="/tags/:id" component={ShowTagPage} />
    </Switch>
  );
};

const mapStateToProps = state => state.currentUser;

export default connect(
  mapStateToProps,
  null
)(RouterComp);
