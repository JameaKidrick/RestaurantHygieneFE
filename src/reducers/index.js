import { combineReducers } from 'redux';

// REDUCERS
import { appStatusReducer } from './appStatusReducer';
import { logInReducer } from './logInReducer';
import { googleAPIReducer } from './googleAPIReducer';
import { reviewsReducer } from './reviewsReducer';

const rootReducer = combineReducers({
  appStatusReducer,
  logInReducer,
  googleAPIReducer,
  reviewsReducer
})

export default rootReducer;