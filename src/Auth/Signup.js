import React, { useState } from 'react';
import AuthService from '../services/auth-service';
import { Link, withRouter } from 'react-router-dom';

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
        setFormValues(initialState);
        props.getUser(response);
      })
      .catch((error) => {
        const { message } = error.response.data;
        setErrorMessage(message);
      });

    props.history.push('/');
  };
  return (
    <div className='formWrapper'>
      <form className='signUpForm' onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className='control'>
          <input
            className='input'
            type='email'
            placeholder='Email Address'
            name='email'
            onChange={handleInputChange}
            value={formValues.email}
            autoComplete='off'
            required
          />
        </div>

        <div className='control'>
          <input
            className='input'
            type='text'
            placeholder='First Name'
            name='firstName'
            onChange={handleInputChange}
            value={formValues.firstName}
            autoComplete='off'
          />
        </div>

        <div className='control'>
          <input
            className='input'
            type='text'
            placeholder='Last Name'
            name='lastName'
            onChange={handleInputChange}
            value={formValues.lastName}
            autoComplete='off'
          />
        </div>

        <div className='control'>
          <input
            className='input'
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleInputChange}
            value={formValues.password}
            autoComplete='off'
            required
          />
        </div>

        <div className='control'>
          <input
            className='input'
            type='password'
            placeholder='Repeat Password'
            name='passwordCheck'
            onChange={handleInputChange}
            value={formValues.passwordCheck}
            autoComplete='off'
            required
          />
        </div>

        <div className='field'>
          <div className='control'>
            <button className='button' type='submit'>
              Sign Up
            </button>
          </div>
        </div>
      </form>
      {errorMessage && <span className='errorMessage'>{errorMessage}</span>}
      <p>
        Already have account?
        <Link to={'/login'}>Login</Link>
      </p>
    </div>
  );
}

export default withRouter(Signup);
