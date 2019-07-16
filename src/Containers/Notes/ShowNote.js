import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { newCommentToDB, createNewLikeToDB } from '../../Adapters/NotesAdapter';
import { isNotEmpty } from '../../Helpers/Helpers';
import like from '../../Assets/Images/like.png';
import '../../stylesheets/notes/showNote.scss';

class ShowNote extends React.Component {
  state = {
    note: {},
    newComment: '',
  };

  likesDiv = React.createRef();

  handleChange = e => {
    console.log(this.state.newComment);
    this.setState({
      newComment: e.target.value,
    });
  };

  handleNewComment = note => {
    const { newComment } = this.state;
    const { currentUser } = this.props;
    if (newComment) {
      this.props.dispatchNewComment(note.id, newComment, currentUser.id);
      this.setState({ newComment: '' });
      setTimeout(() => {
        let pageHeight = document.body.scrollHeight;
        window.scrollTo({
          top: pageHeight,
          behavior: 'smooth',
        });
      }, 100);
    }
  };

  generateTags = note => {
    return note.tags.map(tag => {
      return (
        <Link to={`/tags/${tag.id}`} key={tag.id}>
          {tag.name}
        </Link>
      );
    });
  };

  generateComments = note => {
    if (isNotEmpty(note) && note.comments.length > 0) {
      return note.comments.map(comment => {
        return (
          <li className="comment-li" key={comment.id}>
            <Link to={`/users/${comment.user.id}`}>
              <img src={comment.user.img_url} alt={comment.user.username} />
              <span>{comment.user.username}</span>
            </Link>
            <div className="comment-content">
              <span>{comment.user.username}</span>
              <p>{comment.content}</p>
            </div>
          </li>
        );
      });
    }
  };

  getNote = () => {
    const { match, notes } = this.props;
    const noteID = match.params.id;
    if (this.props.notes.length > 0) {
      return notes.find(note => parseInt(noteID) === note.id);
    }
  };

  commentInputSection = (note, newComment) => {
    return (
      <div className="new-comment">
        <input
          value={newComment}
          onChange={this.handleChange}
          placeholder="Add a new comment..."
        />
        <button onClick={() => this.handleNewComment(note)}>Send</button>
      </div>
    );
  };

  handleLike = () => {
    const { currentUser, dispatchNewLike } = this.props;
    const note = this.getNote();
    const isLiked = note.likes.some(like => {
      return like.user.id === currentUser.id;
    });
    if (!isLiked) {
      dispatchNewLike(currentUser.id, note.id);
    }
  };

  likeButton = () => {
    return (
      <Link className="like" to="#" onClick={this.handleLike}>
        <img src={like} alt="like" />
      </Link>
    );
  };

  showLikes = e => {
    console.log(e);
    console.log(this.likesDiv.current);
    if (this.likesDiv.current !== null) {
      this.likesDiv.current.style.height === ''
        ? (this.likesDiv.current.style.height = '100px')
        : (this.likesDiv.current.style.height = '');
    }
  };

  generateshowLikes = note => {
    if (isNotEmpty(note)) {
      return note.likes.map(like => (
        <Link
          className="user-likes"
          to={`/users/${like.user.id}`}
          key={like.id}
        >
          {like.user.username}
        </Link>
      ));
    }
  };

  render() {
    let note = this.getNote();
    const { currentUser } = this.props;
    const { newComment } = this.state;

    if (note && isNotEmpty(note)) {
      return (
        <div className="note-container">
          <h1> {note.title}</h1>
          <ul className="tags-ul">{this.generateTags(note)}</ul>
          <div dangerouslySetInnerHTML={{ __html: note.content }} />
          <h2>
            {' '}
            {isNotEmpty(currentUser) ? this.likeButton() : null}{' '}
            <span onClick={this.showLikes}>{note.likes.length} likes</span>
          </h2>
          <div ref={this.likesDiv} className="likes-dropdown">
            {this.generateshowLikes(note)}
          </div>

          <h2>Comments</h2>
          {isNotEmpty(currentUser)
            ? this.commentInputSection(note, newComment)
            : null}
          <ul className="note-comments">{this.generateComments(note)}</ul>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  notes: state.notes,
});

const mapDispatchToProps = dispatch => ({
  dispatchNewComment: (noteId, comment, userId) =>
    dispatch(newCommentToDB(noteId, comment, userId)),
  dispatchNewLike: (userId, noteId) =>
    dispatch(createNewLikeToDB(userId, noteId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowNote);
