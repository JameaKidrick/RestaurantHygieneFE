import { combineReducers } from 'redux';

// REDUCERS
import { appStatusReducer } from './appStatusReducer';
import { signUpReducer } from './signUpReducer';
import { logInReducer } from './logInReducer';

const rootReducer = combineReducers({
  appStatusReducer,
  signUpReducer,
  logInReducer
})

export default rootReducer;