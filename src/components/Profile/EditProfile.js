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
    pictureOld: props.loggedInUser.picture,
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
        //`http://localhost:5000/user/${props.loggedInUser._id}`,
        `https://sustainable-christmas-server.herokuapp.com/user/${props.loggedInUser._id}`,
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
    <div className='formWrapper'>
      <h3>Edit Profile</h3>
      <form className='editProfileForm' onSubmit={handleFormSubmit}>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            name='firstName'
            onChange={handleInputChange}
            value={allValues.firstName}
            autoComplete='off'
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            name='lastName'
            onChange={handleInputChange}
            value={allValues.lastName}
            autoComplete='off'
          />
        </div>
        <div className='form-group'>
          <textarea
            maxLength='140'
            rows='2'
            placeholder='Tell something about yourself..'
            className='form-control'
            name='about'
            onChange={handleInputChange}
            value={allValues.about}>
            {allValues.about}
          </textarea>
        </div>
        <div className='form-group'>
          <label className='label'>Upload a Profile Picture</label>
          <input
            className='form-control-file'
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
          value={allValues.pictureOld}
        />
        <div className='form-group button-group'>
          <button className='btn btn-warning' type='submit'>
            Submit
          </button>

          <Link to='/myprofile'>
            <button className='btn btn-danger' type='cancel'>
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  ) : (
    <Redirect to='/login' />
  );
}

export default withRouter(EditProfile);
