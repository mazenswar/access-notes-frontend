import React from 'react';
import { Link } from 'react-router-dom';
import { fetchUserFromDB } from '../../Adapters/UsersAdapter';
import '../../stylesheets/users/userShow.scss';

class UserShow extends React.Component {
  state = {
    user: '',
  };

  componentDidMount() {
    const { match } = this.props;
    const userID = match.params.id;
    fetchUserFromDB(userID).then(userObj => this.setState({ user: userObj }));
  }

  generateNotes = notes => {
    return notes.map(note => {
      return (
        <Link to={`/notes/${note.id}`} key={note.id}>
          {note.title}
        </Link>
      );
    });
  };

  render() {
    const { user } = this.state;
    if (user) {
      return (
        <div>
          <img
            className="user-profile-img"
            src={user.img_url}
            alt="user-profile-img"
          />
          <h1>{user.username}</h1>
          <h2>Notes</h2>
          <ul className="user-show-notes">{this.generateNotes(user.notes)}</ul>
        </div>
      );
    }
    return null;
  }
}

export default UserShow;
