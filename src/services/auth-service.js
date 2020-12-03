import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000/',
      //Change link after server deployment
      withCredentials: true,
    });
    this.service = service;
  }

  signup = (email, password, repeatPassword, firstName, lastName) => {
    return this.service
      .post('/signup', { email, password, repeatPassword, firstName, lastName })
      .then((response) => response.data);
  };
}

export default AuthService;