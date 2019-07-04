import {
  GET_USER,
  LOGIN_USER,
  LOGOUT_USER,
  CREATE_USER,
  DELETE_USER,
} from '../CONSTANTS';

export const getUserAction = user => ({
  type: GET_USER,
  payload: user,
});

export const loginUserAction = user => ({
  type: LOGIN_USER,
  payload: user,
});

export const logouUserAction = () => ({
  type: LOGOUT_USER,
});

export const createUserAction = user => ({
  type: CREATE_USER,
  payload: user,
});

export const deleteUserAction = () => ({
  type: DELETE_USER,
});
