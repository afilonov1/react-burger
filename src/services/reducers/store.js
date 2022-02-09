// import { compose, createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
//
// import { rootReducer } from './';
//
//
// const composeEnhancers =
//     typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//         ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//         : compose;
//
// const enhancer = composeEnhancers(applyMiddleware(thunk));
//
// const store = createStore(rootReducer, enhancer);
//
// export default store;


import {configureStore} from "@reduxjs/toolkit";
import { rootReducer } from './';

const store = configureStore({
  reducer: rootReducer,
})

export default store;
