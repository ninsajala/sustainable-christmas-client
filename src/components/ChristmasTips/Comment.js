import React, { useState } from 'react';
import axios from 'axios';

function Comment(props) {
  const [allValues, setAllValues] = useState({
    content: '',
    tip: props.tip,
    author: props.user,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAllValues({ ...allValues, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { content, tip, author } = allValues;

    axios
      .post(
        'http://localhost:5000/comment',
        //'https://sustainable-christmas-server.herokuapp.com/comment',
        { content, tip, author },
        { withCredentials: true }
      )
      .then(() => {
        setAllValues({
          content: '',
          tip: props.tip,
          author: props.user,
        });
        props.updateTip();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className='form-group'>
          <textarea
            className='form-control'
            placeholder='Leave a comment'
            maxLength='140'
            name='content'
            onChange={handleInputChange}
            value={allValues.content}></textarea>
        </div>

        <div className='form-group'>
          <button className='btn btn-dark' type='submit'>
            Add Comment
          </button>
        </div>
      </form>
    </div>
  );
}

export default Comment;
