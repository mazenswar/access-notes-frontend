import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { createNewNoteToDB } from '../../Adapters/NotesAdapter';

import '../../stylesheets/notes/newNote.scss';

class NewNote extends React.Component {
  state = {
    title: '',
    content: '',
    tags: [],
  };

  handleSubmit = () => {
    const { history, user, handleCreateNote } = this.props;
    const noteObj = { ...this.state, user_id: user.id };
    handleCreateNote(noteObj);
    history.push('/');
  };

  handleKeyPress = e => {
    const { tags } = this.state;
    const input = e.target.value;

    if (e.key === 'Enter' && input !== '' && !tags.includes(input)) {
      this.setState({ tags: [input, ...this.state.tags] });
      e.target.value = '';
    }
  };

  handleChange = data => this.setState({ content: data });

  removeTag = event => {
    const tagToRemove = event.target.innerText;
    const { tags } = this.state;
    const newTags = tags.filter(tag => {
      return tag !== tagToRemove;
    });

    this.setState({ tags: newTags });
    console.log(this.state);
  };

  handleTitleChange = e => {
    console.log(this.state);
    this.setState({ [e.target.name]: e.target.value });
  };

  showTags = () => {
    const { tags } = this.state;
    const showTags = [];
    if (tags.length > 0) {
      tags.forEach(tag => {
        showTags.push(
          <div className="tag-box" key={tag} onClick={this.removeTag}>
            {tag}
          </div>
        );
      });
    }
    return showTags;
  };

  render() {
    const { title, tags } = this.state;
    return (
      <React.Fragment>
        <form>
          <label>Title</label>
          <input
            className="note-title"
            name="title"
            value={title}
            onChange={this.handleTitleChange}
            placeholder="Title"
          />
          <label>Tags</label>
          <input
            className="note-tag"
            name="tags"
            onKeyPress={this.handleKeyPress}
          />
          {tags.length > 0 ? (
            <div className="tag-container">{this.showTags()}</div>
          ) : null}
        </form>
        <CKEditor
          editor={ClassicEditor}
          onChange={(event, editor) => {
            const data = editor.getData();
            this.handleChange(data);
          }}
        />
        <button className="create-button" onClick={this.handleSubmit}>
          Create Note
        </button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.currentUser,
});

const mapDispatchToProps = dispatch => ({
  handleCreateNote: noteObj => dispatch(createNewNoteToDB(noteObj)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewNote)
);
