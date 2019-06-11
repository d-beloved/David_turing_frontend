import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/App.css';
import Header from './common/Header';

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Header} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
