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
        <div className='field'>
          <div className='control'>
            <textarea
              className='textarea'
              placeholder='Leave a comment'
              name='content'
              onChange={handleInputChange}
              value={allValues.content}></textarea>
          </div>
        </div>
        <div className='field'>
          <div className='control'>
            <button className='button' type='submit'>
              Add Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Comment;
