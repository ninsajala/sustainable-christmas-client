import React, { useState } from 'react';
import AuthService from '../../services/auth-service';
import { Link, withRouter, Redirect } from 'react-router-dom';
import './auth.css';

const initialState = {
  email: '',
  password: '',
};

function Login(props) {
  const [formValues, setFormValues] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('');
  const service = new AuthService();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = formValues;

    service
      .login(email, password)
      .then((response) => {
        console.log(`login:`, response);
        setFormValues(initialState);
        localStorage.setItem(`user`, JSON.stringify(response));
        props.getUser(response);
        props.history.push('/');
      })
      .catch((error) => {
        const { message } = error.response.data;
        setErrorMessage(message);
      });
  };

  return props.loggedInUser ? (
    <Redirect to='/' />
  ) : (
    <div className='formWrapper'>
      <form className='signUpForm' onSubmit={handleSubmit}>
        <h3>Log In</h3>
        <div className='form-group'>
          <input
            className='form-control'
            type='email'
            placeholder='Email Address'
            name='email'
            onChange={handleInputChange}
            value={formValues.email}
            autoComplete='off'
            required
          />
        </div>

        <div className='form-group'>
          <input
            className='form-control'
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleInputChange}
            value={formValues.password}
            autoComplete='off'
            required
          />
        </div>

        <button className='btn btn-warning' type='submit'>
          Log In
        </button>
      </form>
      {errorMessage && <span className='errorMessage'>{errorMessage}</span>}
      <p>
        No account yet?{}
        <Link to={'/signup'}>Sign Up</Link>
      </p>
    </div>
  );
}

export default withRouter(Login);
