import React, { useState, useEffect } from 'react';
import UploadService from '../../services/upload-service';
import axios from 'axios';
import './Tips.css';
import { Link, withRouter, Redirect } from 'react-router-dom';

function EditTip(props) {
  const [formState, setFormState] = useState({});
  const { params } = props.match;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/tips/${params.id}`
        // `https://sustainable-christmas-server.herokuapp.com/tips/${params._id}`
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
        `http://localhost:5000/tips/${params.id}`,
        //`https://sustainable-christmas-server.herokuapp.com/tips/${params.id}`,
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
                onChange={handleInputChange}>
                {formState.content}
              </textarea>
            </div>
          </div>

          <div className='control'>
            <input
              className='input'
              type='text'
              placeholder='Paste a link to more info here'
              name='extraInfo'
              onChange={handleInputChange}
              value={formState.title}
              autoComplete='off'
            />
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
            value={formState.picture}
          />

          <div className='field'>
            <div className='control'>
              <button className='button' type='submit'>
                Submit
              </button>
            </div>
            <div className='control'>
              <Link to={`/tips/${params.id}`}>
                <button className='button' type='cancel'>
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </form>
      ) : (
        <span>Loading form..</span>
      )}
    </div>
  ) : (
    <Redirect to='/login' />
  );
}

export default withRouter(EditTip);
