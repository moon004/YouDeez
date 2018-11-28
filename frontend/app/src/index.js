import React from 'react';
import ReactDOM from 'react-dom';

import {
  applyMiddleware,
  compose,
  combineReducers,
  createStore,
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  initDB,
} from './utils/indexdb';
import * as serviceWorker from './serviceWorker';
import ConnMainWrapper from './MainWrapper';
import {
  mediaTypeReducer,
  mediaObjectReducer,
  mediaDownloadReducer,
} from './reducers/mediaType-reducer';
import { SearchReducer, SACReducer } from './reducers/search-reducer';
// initiailize IndexedDb, check if it's supported.

if (!(window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB)) {
  window.alert(
    'this browser doesnt support indexed DB, therefore download is not supported',
  );
}
initDB();

const allReducers = combineReducers({
  MediaObject: mediaObjectReducer,
  currentMediaTap: mediaTypeReducer,
  downloadObject: mediaDownloadReducer,
  apiReqState: SearchReducer,
  autoComplete: SACReducer, // SAC is Search Auto Complete
});

const store = createStore(allReducers, applyMiddleware(thunk));


ReactDOM.render(<Provider store={store}><div><ConnMainWrapper /></div></Provider>, document.getElementById('media player'));
// ReactDOM.render(<App2 />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
// serviceWorker.registerSWRegardless();
