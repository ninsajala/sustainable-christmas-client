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
        //'http://localhost:5000/comment',
        'https://sustainable-christmas-server.herokuapp.com/comment',
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
    <form className='row' onSubmit={handleFormSubmit}>
      <span className='col-1'></span>
      <input
        className='form-control col-8'
        placeholder='Leave a comment'
        maxLength='140'
        name='content'
        onChange={handleInputChange}
        autoComplete='off'
        value={allValues.content}
      />

      <div className='form-group col-1'>
        <button className='btn btn-warning' type='submit'>
          Add
        </button>
      </div>
    </form>
  );
}

export default Comment;
