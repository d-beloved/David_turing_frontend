import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import './styles/index.css';
import configureStore from './store/configureStore';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

axios.defaults.withCredentials = true; // sets the cookies from backend

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
