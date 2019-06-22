import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import configureStore from './store/configureStore';
import isLoggedIn from './utils/isLoggedIn';
import { setLoggedInUser, logout } from './actions/authAction';
import App from './App';
import * as serviceWorker from './serviceWorker';


// global axios defaults
const { token } = localStorage;
// eslint-disable-next-line dot-notation
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.withCredentials = true;
global.axios = axios;

const store = configureStore();

if (isLoggedIn()) {
  store.dispatch(setLoggedInUser());
} else {
  store.dispatch(logout());
}


const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
)
ReactDOM.render(<Main />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
