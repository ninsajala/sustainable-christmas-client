import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TipsListItem(props) {
  const handleDeleteTip = () => {
    axios
      .delete(
        `https://sustainable-christmas-server.herokuapp.com/tips/${props.item._id}`
      )
      .then(() => props.history.push(`/myprofile`));
  };

  return (
    <div className='listItem'>
      <article className='oneTipList withButtons'>
        <img src={props.item.picture} alt={props.item.title} />
        <h4>{props.item.title}</h4>
        <div className='form-group button-group'>
          <button className='btn btn-warning btn-sm' title='Edit Tip'>
            <Link to={`/tips/edit/${props.item._id}`}>
              <i className='fas fa-edit'></i>
            </Link>
          </button>
          <Link to={`/tips/${props.item._id}`}>
            <button className='btn btn-warning' title='View Tip'>
              <i class='fas fa-eye'></i>
            </button>
          </Link>
          <button
            className='btn btn-danger btn-sm'
            onClick={handleDeleteTip}
            title='Remove Tip'>
            <i className='fas fa-trash-alt'></i>
          </button>
        </div>
      </article>
    </div>
  );
}

export default TipsListItem;
