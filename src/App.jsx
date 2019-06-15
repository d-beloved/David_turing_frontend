import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './common/Header/Header';
import Footer from './common/Footer/Footer';
import './styles/App.css';
import Homepage from './components/Homepage/Homepage';
import ProductPage from './components/ProductsPage/Products';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/SIgnup';

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/products' component={ProductPage} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/signup' component={Signup} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
