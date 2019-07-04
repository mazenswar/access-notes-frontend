import { combineReducers } from 'redux';

// import reducers here
import usersReducer from './usersReducer';
import notesReducer from './notesReducer';

// combine reducers takes an object with keys and values(reducers)
const rootReducer = combineReducers({
  currentUser: usersReducer,
  notes: notesReducer,
});

export default rootReducer;
