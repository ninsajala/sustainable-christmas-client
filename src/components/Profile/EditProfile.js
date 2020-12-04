import React, { useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import UploadService from '../../services/upload-service';
import axios from 'axios';

function EditProfile(props) {
  const [allValues, setAllValues] = useState({
    firstName: props.loggedInUser.firstName,
    lastName: props.loggedInUser.lastName,
    about: props.loggedInUser.about,
    picture: props.loggedInUser.picture,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAllValues({ ...allValues, [name]: value });
  };

  const service = new UploadService();

  const handleFileUpload = (event) => {
    const uploadData = new FormData();
    uploadData.append('picture', event.target.files[0]);

    service
      .upload(uploadData)
      .then((response) => {
        setAllValues({ ...allValues, picture: response.cloudUrl });
      })
      .catch((err) => {
        console.log('Error while uploading the file: ', err);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { firstName, lastName, about, picture, pictureOld } = allValues;

    axios
      .put(
        `http://localhost:5000/user/${props.loggedInUser._id}`,
        //`https://sustainable-christmas-server.herokuapp.com/user/${props.loggedInUser._id}`,
        { firstName, lastName, about, picture, pictureOld },
        { withCredentials: true }
      )
      .then((response) => {
        props.getUser(response.data);
        props.history.push('/myprofile');
      })
      .catch((error) => console.error(error));
  };

  return props.loggedInUser ? (
    <div>
      <form className='editProfileForm' onSubmit={handleFormSubmit}>
        <h3>Edit Profile</h3>
        <div className='control'>
          <input
            className='input'
            type='text'
            name='firstName'
            onChange={handleInputChange}
            value={allValues.firstName}
            autoComplete='off'
          />
        </div>
        <div className='control'>
          <input
            className='input'
            type='text'
            name='lastName'
            onChange={handleInputChange}
            value={allValues.lastName}
            autoComplete='off'
          />
        </div>
        <div className='field'>
          <div className='control'>
            <textarea
              className='textarea'
              name='about'
              onChange={handleInputChange}
              value={allValues.about}>
              {allValues.about}
            </textarea>
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
        <input
          type='text'
          name='pictureOld'
          hidden
          onChange={handleInputChange}
          value={allValues.picture}
        />
        <div className='field'>
          <div className='control'>
            <button className='button' type='submit'>
              Submit
            </button>
          </div>
          <div className='control'>
            <Link to='/myprofile'>
              <button className='button' type='cancel'>
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <Redirect to='/login' />
  );
}

export default withRouter(EditProfile);
