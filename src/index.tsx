import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter as Router} from 'react-router-dom';
import App from './components/app/app';
import store from "./services/reducers/store";
import './index.css';

ReactDOM.render(
  (
    <Provider store={store}>
      <React.StrictMode>
        <Router>
          <App/>
        </Router>
      </React.StrictMode>
    </Provider>
  ),
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

