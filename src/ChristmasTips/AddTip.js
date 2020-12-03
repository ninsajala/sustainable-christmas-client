import React, { useState } from 'react';
import axios from 'axios';
import './Tips.css';
import UploadService from '../services/upload-service';
import { Link, withRouter } from 'react-router-dom';

const initialState = { title: '', content: '', category: '', picture: '' };

function AddTip(props) {
  const [formState, setFormState] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const service = new UploadService();

  const handleFileUpload = (event) => {
    const uploadData = new FormData();
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

    const { title, content, category, picture } = formState;

    axios
      .post(
        'https://sustainable-christmas-server.herokuapp.com/tips',
        { title, content, category, picture },
        { withCredentials: true }
      )
      .then(() => {
        setFormState(initialState);
      })
      .catch((error) => console.error(error));

    props.history.push('/tips');
  };

  return (
    <form className='field addTipForm' onSubmit={handleFormSubmit}>
      <h3>Add a Christmas Tip</h3>
      <div className='control'>
        <input
          className='input'
          type='text'
          placeholder='Title'
          name='title'
          onChange={handleInputChange}
          value={formState.title}
          autoComplete='off'
        />
      </div>

      <div className='field'>
        <label className='label'>Category</label>
        <div className='control'>
          <div className='select'>
            <select
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
        </div>
      </div>

      <div className='field'>
        <div className='control'>
          <textarea
            className='textarea'
            placeholder='Fill in your tip here'
            name='content'
            onChange={handleInputChange}
            value={formState.content}></textarea>
        </div>
      </div>

      <div className='file'>
        <label className='file-label'>Upload a picture</label>
        <input
          className='file-input'
          type='file'
          name='picture'
          onChange={handleFileUpload}
        />
      </div>

      <div className='field'>
        <div className='control'>
          <button className='button' type='submit'>
            Submit
          </button>
        </div>
        <div className='control'>
          <Link to='/tips'>
            <button className='button' type='cancel'>
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default withRouter(AddTip);
