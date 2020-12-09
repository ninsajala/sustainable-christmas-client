import React, { useState } from 'react';
import AuthService from '../../services/auth-service';
import { Link, withRouter, Redirect } from 'react-router-dom';
import './auth.css';

const initialState = {
  email: '',
  password: '',
  passwordCheck: '',
  firstName: '',
  lastName: '',
};

function Signup(props) {
  const [formValues, setFormValues] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('');
  const service = new AuthService();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, password, passwordCheck, firstName, lastName } = formValues;

    service
      .signup(email, password, passwordCheck, firstName, lastName)
      .then((response) => {
        console.log(`Service signup:`, response);
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
        <h3>Sign Up</h3>
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
            type='text'
            placeholder='First Name'
            name='firstName'
            onChange={handleInputChange}
            value={formValues.firstName}
            autoComplete='off'
          />
        </div>

        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='Last Name'
            name='lastName'
            onChange={handleInputChange}
            value={formValues.lastName}
            autoComplete='off'
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

        <div className='form-group'>
          <input
            className='form-control'
            type='password'
            placeholder='Repeat Password'
            name='passwordCheck'
            onChange={handleInputChange}
            value={formValues.passwordCheck}
            autoComplete='off'
            required
          />
        </div>

        <button className='btn btn-warning' type='submit'>
          Sign Up
        </button>
      </form>
      {errorMessage && <span className='errorMessage'>{errorMessage}</span>}
      <p>
        Already have account? {}
        <Link to={'/login'}>Login</Link>
      </p>
    </div>
  );
}

export default withRouter(Signup);
