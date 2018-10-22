import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import MainWrapper from './MainWrapper';
import * as serviceWorker from './serviceWorker';
import { 
    applyMiddleware, 
    compose, 
    combineReducers, 
    createStore
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import mediaTypeReducer from './reducers/mediaType-reducer';
import SearchReducer from './reducers/search-reducer';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min';



const allReducers = combineReducers({
    whichMedia: mediaTypeReducer,
    currentMediaTap: mediaTypeReducer,
    apiReqState: SearchReducer
});

const allStoreEnchancer = compose(
    applyMiddleware(thunk),
    window.devToolsExtension && window.devToolsExtension()
);

const store = createStore(allReducers, {
    whichMedia: null,
    currentMediaTap: 'YOUTUBE'
},
    allStoreEnchancer
);


ReactDOM.render(<Provider store={store}><div><MainWrapper/></div></Provider>, document.getElementById('media player'));
//ReactDOM.render(<App2 />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
