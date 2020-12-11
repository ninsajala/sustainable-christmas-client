import React from 'react';
import { Link } from 'react-router-dom';

function OtherProfileTipList(props) {
  return (
    <div className='listItem'>
      <Link to={`/tips/${props.item._id}`}>
        <article className='oneListItem'>
          <img src={props.item.picture} alt={props.item.title} />
          <h4>{props.item.title}</h4>
        </article>
      </Link>
    </div>
  );
}

export default OtherProfileTipList;
