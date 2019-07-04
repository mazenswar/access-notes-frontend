import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../stylesheets/notes/allNotes.scss';

const AllNotes = props => {
  const generateNoteLIs = () => {
    const { notes } = props;
    if (notes.length > 0) {
      return notes.map(note => {
        return (
          <Link to={`notes/${note.id}`} key={note.id} className="note-li">
            {note.title}
          </Link>
        );
      });
    }
  };

  return (
    <React.Fragment>
      <h1>Notes</h1>
      <ul className="notes-ul">{generateNoteLIs()}</ul>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  notes: state.notes,
});

export default connect(
  mapStateToProps,
  null
)(AllNotes);
