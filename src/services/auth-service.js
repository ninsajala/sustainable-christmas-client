import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      //baseURL: 'http://localhost:5000',
      baseURL: 'https://sustainable-christmas-server.herokuapp.com/',
      withCredentials: true,
    });
  }

  signup = (email, password, passwordCheck, firstName, lastName) => {
    return this.service
      .post('/signup', { email, password, passwordCheck, firstName, lastName })
      .then((response) => response.data);
  };

  loggedin = () => {
    return this.service.get('/loggedin').then((response) => response.data);
  };

  login = (email, password) => {
    return this.service
      .post('/login', { email, password })
      .then((response) => response.data);
  };

  logout = () => {
    return this.service.post('/logout', {}).then((response) => response.data);
  };
}

export default AuthService;
