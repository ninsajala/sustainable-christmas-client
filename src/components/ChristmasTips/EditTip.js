import React, { useState, useEffect } from 'react';
import UploadService from '../../services/upload-service';
import axios from 'axios';
import './Tips.css';
import { Link, withRouter, Redirect } from 'react-router-dom';

function EditTip(props) {
  const [formState, setFormState] = useState({});
  const { params } = props.match;
  const [loaded, setLoaded] = useState(false);
  let uploadFile = null;

  useEffect(() => {
    axios
      .get(
        `https://sustainable-christmas-server.herokuapp.com/tips/${params.id}`
      )
      .then((foundTip) => {
        setFormState({
          title: foundTip.data.title,
          content: foundTip.data.content,
          category: foundTip.data.category,
          picture: foundTip.data.picture,
          extraInfo: foundTip.data.extraInfo,
        });
        setLoaded(true);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const service = new UploadService();

  const handleFileUpload = (event) => {
    uploadFile = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append('picture', event.target.files[0]);

    service
      .upload(uploadData)
      .then((response) => {
        console.log(response);
        setFormState({ ...formState, picture: response.cloudUrl });
      })
      .catch((err) => {
        console.log('Error while uploading the file: ', err);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      content,
      category,
      picture,
      extraInfo,
      pictureOld,
    } = formState;

    axios
      .put(
        `https://sustainable-christmas-server.herokuapp.com/tips/${params.id}`,
        {
          title,
          content,
          category,
          picture,
          pictureOld,
          extraInfo,
        },
        { withCredentials: true }
      )
      .then((response) => {
        props.history.push(`/tips/${response.data._id}`);
      })
      .catch((error) => console.error(error));
  };

  return props.loggedInUser ? (
    <div>
      {loaded ? (
        <div className='formWrapper'>
          <h3>Edit your Christmas Tip</h3>
          <form className='signUpForm bigForm' onSubmit={handleFormSubmit}>
            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                placeholder='Title of your Article'
                name='title'
                maxLength='50'
                onChange={handleInputChange}
                value={formState.title}
                autoComplete='off'
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
                defaultValue={formState.content}></textarea>
            </div>

            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                placeholder='Paste a link to more info here'
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

            <input
              type='text'
              name='pictureOld'
              hidden
              onChange={handleInputChange}
              value={formState.picture}
            />

            <div className='form-group button-group'>
              <Link to={`/tips/${params.id}`}>
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
        <span>Loading form..</span>
      )}
    </div>
  ) : (
    <Redirect to='/login' />
  );
}

export default withRouter(EditTip);
