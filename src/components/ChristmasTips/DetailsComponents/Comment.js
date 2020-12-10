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
        'https://sustainable-christmas-server.herokuapp.com/comment',
        { content, tip, author },
        { withCredentials: true }
      )
      .then((response) => {
        props.getUser(response.data);
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
    <form className='row commentForm' onSubmit={handleFormSubmit}>
      <input
        className='form-control col-9'
        placeholder='Leave a comment'
        maxLength='35'
        name='content'
        onChange={handleInputChange}
        autoComplete='off'
        value={allValues.content}
      />

      <div className='form-group col-3'>
        <button className='btn btn-warning' type='submit'>
          Add
        </button>
      </div>
    </form>
  );
}

export default Comment;
