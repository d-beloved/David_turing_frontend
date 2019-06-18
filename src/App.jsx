import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './common/Header/Header';
import Footer from './common/Footer/Footer';
import './styles/App.css';
import Homepage from './components/Homepage/Homepage';
import ProductPage from './components/ProductsPage/Products';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/SIgnup';
import ProductDetails from './components/ProductDetails/ProductDetails';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/catalog' component={ProductPage} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path="/catalog/product/:product_id" component={ProductDetails} />
          <Route exact path='/cart' component={ShoppingCart} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
