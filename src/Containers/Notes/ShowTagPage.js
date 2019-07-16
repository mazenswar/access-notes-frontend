import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTagNotesFromDB } from '../../Adapters/NotesAdapter';

import '../../stylesheets/notes/showTag.scss';

class ShowTagPage extends React.Component {
  state = {
    tag: {},
  };

  componentDidMount() {
    const { match } = this.props;
    const tagId = match.params.id;
    fetchTagNotesFromDB(tagId).then(data =>
      this.setState({ tag: data }, () => {})
    );
  }

  generateNotes = notes => {
    if (notes && notes.length > 0) {
      return notes.map(note => {
        return (
          <Link className="tag-notes" to={`/notes/${note.id}`} key={note.id}>
            <div>
              <img src={note.user.img_url} alt={note.user.username} />
              <span>{note.user.username}</span>
            </div>
            <p>{note.title}</p>
          </Link>
        );
      });
    }
  };

  render() {
    const { tag } = this.state;
    return (
      <React.Fragment>
        <h1>{tag.name}</h1>
        <ul className="tag-notes-ul">{this.generateNotes(tag.notes)}</ul>
      </React.Fragment>
    );
  }
}

export default ShowTagPage;
