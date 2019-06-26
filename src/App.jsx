import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './common/Header/Header';
import Footer from './common/Footer/Footer';
import './styles/App.css';
import Homepage from './components/Homepage/Homepage';
import ProductPage from './components/ProductsPage/Products';
import Auth from './components/Auth/Auth';
import ProductDetails from './components/ProductDetails/ProductDetails';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import ProtectedRoute from './utils/Authorization';
import Checkout from './components/Checkout/Checkout';
import CategoryProduct from './components/ProductsPage/CategoryProduct';
import DepartmentProduct from './components/ProductsPage/DepartmentProduct';
import SearchProduct from './components/ProductsPage/SearchProduct';


const App = () => {
  return (
    <Router>
      <div className='App'>
        <Header />
        <div className="content">
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/catalog' component={ProductPage} />
            <Route exact path="/catalog/product/:product_id" component={ProductDetails} />
            <Route exact path="/catalog/category/:category_id" component={CategoryProduct} />
            <Route exact path="/catalog/department/:department_id" component={DepartmentProduct} />
            <Route exact path="/catalog/search" component={SearchProduct} />
            <Route exact path='/signin' component={Auth} />
            <Route exact path='/signup' component={Auth} />
            <Route exact path='/cart' component={ShoppingCart} />
            <ProtectedRoute exact path='/checkout' component={Checkout} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
