import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchShowNoteFromDB,
  newCommentToDB,
} from '../../Adapters/NotesAdapter';
import '../../stylesheets/notes/showNote.scss';

class ShowNote extends React.Component {
  state = {
    note: {},
    newComment: '',
  };

  componentDidMount() {
    const { match } = this.props;
    const noteID = match.params.id;
    fetchShowNoteFromDB(noteID).then(dbNote => this.setState({ note: dbNote }));
  }

  handleChange = e => {
    console.log(this.state.newComment);
    this.setState({
      newComment: e.target.value,
    });
  };

  handleNewComment = () => {
    const { newComment, note } = this.state;
    const { currentUser } = this.props;
    this.props.dispatchNewComment(note.id, newComment, currentUser.id);
  };

  generateTags = note => {
    return note.tags.map(tag => {
      return (
        <Link to={`tags/${tag.id}`} key={tag.id}>
          {tag.name}
        </Link>
      );
    });
  };

  generateComments = note => {
    if (Object.keys(note).length > 0 && note.comments.length > 0) {
      return note.comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>;
      });
    }
  };

  render() {
    const { note, newComment } = this.state;
    return (
      <div className="note-container">
        <h1> {note.title}</h1>
        <ul className="tags-ul">
          {Object.keys(note).length > 0 ? this.generateTags(note) : null}
        </ul>
        <div dangerouslySetInnerHTML={{ __html: note.content }} />
        <div>
          <input value={newComment} onChange={this.handleChange} />
          <button onClick={this.handleNewComment}>Send</button>
        </div>
        <ul className="note-comments">{this.generateComments(note)}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => ({
  dispatchNewComment: (noteId, comment, userId) =>
    dispatch(newCommentToDB(noteId, comment, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowNote);
