import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './common/Header/Header';
import Footer from './common/Footer/Footer';
import './styles/App.css';
import Homepage from './components/Homepage/Homepage';

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
