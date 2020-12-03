import React, { useState } from 'react';
import AuthService from '../services/auth-service';
import { Link } from 'react-router-dom';

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

    const {
      email,
      password,
    } = formValues;

    service
      .login(email, password)
      .then((response) => {
        setFormValues(initialState);
        props.getUser(response);
      })
      .catch((error) => {
        const { message } = error.response.data;
        setErrorMessage(message);
      });
  };

  return (
    <div className='formWrapper'>
      <form className='signUpForm' onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className='control'>
          <input
            className='input'
            type='text'
            placeholder='Email Address'
            name='email'
            onChange={handleInputChange}
            value={formValues.email}
            required
          />
        </div>

        <div className='control'>
          <input
            className='input'
            type='text'
            placeholder='Password'
            name='password'
            onChange={handleInputChange}
            value={formValues.password}
            required
          />
        </div>

        <div className='field'>
          <div className='control'>
            <button className='button' type='submit'>
              Log In
            </button>
          </div>
        </div>
      </form>
      {errorMessage && <span className='errorMessage'>{errorMessage}</span>}
      <p>
        No account yet?
        <Link to={'/signup'}>Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
