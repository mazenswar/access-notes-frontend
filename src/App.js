import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// Components
import Nav from './Components/Master/Nav';
import RouterComp from './Routing/RouterComp';
// Adapter Functions
import { persistUserFromDB } from './Adapters/UsersAdapter';
import { getNotesFromDB } from './Adapters/NotesAdapter';
// stylesheets
import './stylesheets/master.scss';

class App extends React.Component {
  componentDidMount() {
    const { getUser, getNotes } = this.props;
    getUser();
    getNotes();
  }

  render() {
    return (
      <BrowserRouter>
        <Nav />
        <RouterComp />
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUser: () => {
    if (localStorage.getItem('token')) {
      dispatch(persistUserFromDB());
    }
  },
  getNotes: () => {
    dispatch(getNotesFromDB());
  },
});

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
