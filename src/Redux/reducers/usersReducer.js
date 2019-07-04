// import constants
import {
  GET_USER,
  CREATE_USER,
  DELETE_USER,
  LOGIN_USER,
  LOGOUT_USER,
} from '../CONSTANTS';

const defaultState = {};

const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case DELETE_USER:
      return {};
    case CREATE_USER:
      return action.payload;
    case LOGIN_USER:
      return action.payload;
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
};

export default usersReducer;
