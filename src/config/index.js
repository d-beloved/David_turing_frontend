export default {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://turing-shop.herokuapp.com' : 'http://localhost:3110',
};
