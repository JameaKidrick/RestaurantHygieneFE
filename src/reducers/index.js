import { combineReducers } from 'redux';

// REDUCERS
import { appStatusReducer } from './appStatusReducer';
import { logInReducer } from './logInReducer';
import { googleAPIReducer } from './googleAPIReducer';

const rootReducer = combineReducers({
  appStatusReducer,
  logInReducer,
  googleAPIReducer
})

export default rootReducer;