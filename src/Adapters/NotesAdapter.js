import { BASE_URL } from '../ApiConstants';
import {
  newNoteAction,
  getNotesAction,
  newCommentAction,
  createNewLikeAction,
} from '../Redux/actions/NotesActions';

// New Note
export const newNoteConfig = noteObj => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accepts: 'application/json',
  },
  body: JSON.stringify(noteObj),
});

export const createNewNoteToDB = noteObj => dispatch => {
  fetch(`${BASE_URL}/notes`, newNoteConfig(noteObj))
    .then(r => r.json())
    .then(createdNote => {
      dispatch(newNoteAction(createdNote));
    });
};

// Get Notes

export const getNotesFromDB = () => dispatch => {
  fetch(`${BASE_URL}/notes`)
    .then(r => r.json())
    .then(notes => {
      dispatch(getNotesAction(notes));
    });
};

// Get tag notes

export const fetchTagNotesFromDB = id => {
  return fetch(`${BASE_URL}/tags/${id}`).then(r => r.json());
};

// New Comments
const configNewComments = (comment, noteId, userId) => ({
  method: 'PATCH',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    content: comment,
    note_id: noteId,
    user_id: userId,
  }),
});

export const newCommentToDB = (noteId, comment, userId) => dispatch => {
  fetch(
    `${BASE_URL}/notes/${noteId}`,
    configNewComments(comment, noteId, userId)
  )
    .then(r => r.json())
    .then(commentObj => {
      dispatch(newCommentAction(commentObj));
    });
};

// Likes

const newLikeConfig = (userId, noteId) => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id: userId,
    note_id: noteId,
  }),
});

export const createNewLikeToDB = (userId, noteId) => dispatch => {
  fetch(`${BASE_URL}/likes`, newLikeConfig(userId, noteId))
    .then(r => r.json())
    .then(likeObj => {
      dispatch(createNewLikeAction(likeObj));
    });
};
