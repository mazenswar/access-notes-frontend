import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTagNotesFromDB } from '../../Adapters/NotesAdapter';

class ShowTagPage extends React.Component {
  state = {
    tagName: '',
    notes: [],
  };

  componentDidMount() {
    const { match } = this.props;
    const tagId = match.params.id;
    fetchTagNotesFromDB(tagId).then(data =>
      this.setState({ notes: data.notes, tagName: data.tag_name })
    );
  }

  generateNotes = notes => {
    if (notes.length > 0) {
      return notes.map(note => {
        return (
          <Link to={`/notes/${note.id}`} key={note.id}>
            {' '}
            {note.title}{' '}
          </Link>
        );
      });
    }
  };

  render() {
    const { notes, tagName } = this.state;
    return (
      <React.Fragment>
        <h1>{tagName}</h1>
        <ul>{this.generateNotes(notes)}</ul>
      </React.Fragment>
    );
  }
}

export default ShowTagPage;
