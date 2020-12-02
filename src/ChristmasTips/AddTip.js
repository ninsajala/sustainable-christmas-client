import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tips.css';

function AddTip() {
  return (
    <form className='field addTipForm is-primary'>
      <h3>Add a Christmas Tip</h3>
      <div className='control'>
        <input
          className='input is-primary'
          type='text'
          placeholder='Title'
          name='title'
        />
      </div>

      <div className='field'>
        <label className='label'>Category</label>
        <div className='control'>
          <div className='select is-primary'>
            <select name='category'>
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
            className='textarea is-primary'
            placeholder='Fill in your tip here'
            name='content'></textarea>
        </div>
      </div>

      <div className='file is-primary'>
        <label className='file-label'>
          <input className='file-input' type='file' name='picture' />
          <span className='file-cta'>
            <span className='file-icon'>
              <i className='fas fa-upload'></i>
            </span>
            <span className='file-label'>Upload a picture</span>
          </span>
        </label>
      </div>

      <div className='field is-grouped'>
        <div className='control'>
          <button className='button is-link'>Submit</button>
        </div>
        <div className='control'>
          <button className='button is-link is-light'>Cancel</button>
        </div>
      </div>
    </form>
  );
}

export default AddTip;
