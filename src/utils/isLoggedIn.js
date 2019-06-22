import jwtDecode from 'jwt-decode';

const isLoggedIn = () => {
  const token = window.localStorage.getItem('token');

  let decoded;

  try {
    decoded = jwtDecode(token);
  } catch (error) {
    return false;
  }

  const { exp } = decoded;
  const currentDate = new Date();

  return exp * 1000 - currentDate.getTime() > 1;
};

export default isLoggedIn;
