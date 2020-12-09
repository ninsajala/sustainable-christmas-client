import React, { useState } from 'react';
import axios from 'axios';
import './Tips.css';
import UploadService from '../../services/upload-service';
import { Link, withRouter, Redirect } from 'react-router-dom';

const initialState = {
  title: '',
  content: '',
  category: '',
  picture: '',
  extraInfo: '',
};

function AddTip(props) {
  const [formState, setFormState] = useState(initialState);
  let uploadFile = null;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const service = new UploadService();

  const handleFileUpload = (event) => {
    const uploadData = new FormData();
    uploadFile = event.target.files[0];
    uploadData.append('picture', event.target.files[0]);

    service
      .upload(uploadData)
      .then((response) => {
        setFormState({ ...formState, picture: response.cloudUrl });
      })
      .catch((err) => {
        console.log('Error while uploading the file: ', err);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { title, content, category, picture, extraInfo } = formState;

    axios
      .post(
        'https://sustainable-christmas-server.herokuapp.com/tips',
        {
          title,
          content,
          category,
          picture,
          author: props.loggedInUser._id,
          extraInfo,
        },
        { withCredentials: true }
      )
      .then((response) => {
        setFormState(initialState);
        props.history.push(`/tips`);
      })
      .catch((error) => console.error(error));
  };

  return props.loggedInUser ? (
    <div className='formWrapper'>
      <h3>Add a Christmas Tip</h3>
      <form className='signUpForm bigForm' onSubmit={handleFormSubmit}>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='Title of your Article'
            name='title'
            onChange={handleInputChange}
            value={formState.title}
            autoComplete='off'
            maxLength='50'
          />
        </div>

        <div className='form-group row'>
          <label className='col-sm-4 col-form-label'>Category:</label>
          <select
            className='form-control col-sm-8'
            value={formState.category}
            name='category'
            onChange={handleInputChange}>
            <option value='Food'>Food</option>
            <option value='Gifts'>Gifts</option>
            <option value='Decoration'>Decoration</option>
            <option value='Charity'>Charity</option>
            <option value='Other'>Other</option>
          </select>
        </div>

        <div className='form-group'>
          <textarea
            rows='5'
            className='form-control'
            placeholder='What tip for a more sustainable Christmas do you want to share with the world?'
            name='content'
            onChange={handleInputChange}
            value={formState.content}></textarea>
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='You can past a link to more information here'
            name='extraInfo'
            onChange={handleInputChange}
            value={formState.extraInfo}
            autoComplete='off'
          />
        </div>

        <div className='form-group'>
          <label className='label'>Upload a picture</label>
          <input
            className='form-control-file'
            type='file'
            name='picture'
            onChange={handleFileUpload}
          />
        </div>

        <div className='form-group button-group'>
          <Link to='/tips'>
            <button className='btn btn-danger' type='cancel'>
              Cancel
            </button>
          </Link>

          {!formState.picture && uploadFile ? (
            <button className='btn btn-warning' disabled type='submit'>
              Save Changes
            </button>
          ) : (
            <button className='btn btn-warning' type='submit'>
              Save Changes
            </button>
          )}
        </div>
      </form>
    </div>
  ) : (
    <Redirect to='/login' />
  );
}

export default withRouter(AddTip);
