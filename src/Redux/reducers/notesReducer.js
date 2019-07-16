import { GET_NOTES, NEW_NOTE, NEW_COMMENT, NEW_LIKE } from '../CONSTANTS';

const defaultState = [];

const addNewComment = (notes, comment) => {
  const notesCopy = [...notes];
  notesCopy.map(note => {
    if (note.id === comment.note.id) {
      return note.comments.push(comment);
    }
    return note;
  });
  return notesCopy;
};

const addNewLike = (notes, like) => {
  const notesCopy = [...notes];
  notesCopy.map(note => {
    if (note.id === like.note.id) {
      return note.likes.push(like);
    }
    return note;
  });
  return notesCopy;
};

const notesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_NOTES:
      return action.payload;
    case NEW_NOTE:
      return [action.payload, ...state];
    case NEW_COMMENT:
      return addNewComment(state, action.payload);
    case NEW_LIKE:
      return addNewLike(state, action.payload);
    default:
      return state;
  }
};

export default notesReducer;
