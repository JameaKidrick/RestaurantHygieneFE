import { combineReducers } from 'redux';

// REDUCERS
import { appStatusReducer } from './appStatusReducer';
import { signUpReducer } from './signUpReducer';
import { logInReducer } from './logInReducer';
import { googleAPIReducer } from './googleAPIReducer';

const rootReducer = combineReducers({
  appStatusReducer,
  signUpReducer,
  logInReducer,
  googleAPIReducer
})

export default rootReducer;