import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import photoReducer from './reducers/photoReducer';

const reducers = combineReducers({
  photos: photoReducer
})

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk)
));

export default store;