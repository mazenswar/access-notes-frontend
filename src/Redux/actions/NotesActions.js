import { NEW_NOTE, GET_NOTES, NEW_COMMENT, NEW_LIKE } from '../CONSTANTS';

export const newNoteAction = newNote => ({
  type: NEW_NOTE,
  payload: newNote,
});

export const getNotesAction = notes => ({
  type: GET_NOTES,
  payload: notes,
});

export const newCommentAction = comment => ({
  type: NEW_COMMENT,
  payload: comment,
});

export const createNewLikeAction = like => ({
  type: NEW_LIKE,
  payload: like,
});
