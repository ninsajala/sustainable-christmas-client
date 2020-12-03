import React, { useState } from 'react';
import axios from 'axios';
import './Tips.css';
import '../services/upload-service';

const initialState = { title: '', content: '', category: '', picture: '' };

function AddTip() {
  const [formState, setFormState] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  // const handleFileUpload = (event) => {
  //     const file = event.target.files[0]

  // }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { title, content, category, picture } = formState;

    axios
      .post(
        'http://localhost:5000/tips',
        { title, content, category, picture },
        { withCredentials: true }
      )
      .then(() => {
        setFormState(initialState);
      })
      .catch((error) => console.error(error));
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
          //onChange={handleFileUpload}
        />
      </div>

      <div className='field'>
        <div className='control'>
          <button className='button' type='submit'>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddTip;
