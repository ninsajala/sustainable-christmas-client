import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TipsListItem(props) {
  
  const handleDeleteTip = () => {
    axios
      .delete(
        //`http://localhost:5000/tips/${tipDetails._id}`
        `https://sustainable-christmas-server.herokuapp.com/tips/${props.item._id}`
      )
      .then(() => props.history.push(`/myprofile`));
  };

  return (
    <div className='listItem'>
      <Link to={`/tips/${props.item._id}`}>
        <article className='oneTipList'>
          <img src={props.item.picture} alt={props.item.title} />
          <h4>{props.item.title}</h4>
          <div className='form-group button-group'>
            <Link to={`/tips/edit/${props.item._id}`}>
              <button className='btn btn-warning btn-sm'>
                <i className='fas fa-edit'></i>
              </button>
            </Link>

            <button className='btn btn-danger btn-sm' onClick={handleDeleteTip}>
              <i className='fas fa-trash-alt'></i>
            </button>
          </div>
        </article>
      </Link>
    </div>
  );
}

export default TipsListItem;
