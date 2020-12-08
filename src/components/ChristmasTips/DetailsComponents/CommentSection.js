import React from 'react';
import Comment from './Comment';
import axios from 'axios';

function CommentSection(props) {
  const handleRemoveComment = (id) => {
    axios
      .delete(
        `http://localhost:5000/comment/${id}`
        //`https://sustainable-christmas-server.herokuapp.com/comment/${id}`
      )
      .then(() => {
        props.getTipDetails();
      });
  };

  return (
    <div className='commentSection'>
      {props.tipDetails.comments.length === 0 && <p>Leave the first comment</p>}
      {props.tipDetails.comments.length > 0 && (
        <div className='commentList'>
          <h6>Comments:</h6>
          {props.tipDetails.comments.map((item) => (
            <div key={item._id} className='oneComment'>
              <q>{item.content}</q> {}
              <p>- {item.author.firstName}</p>
              {props.loggedInUser.comments.includes(item._id) && (
                <button
                  className='btn btn-danger btn-sm removeComment'
                  onClick={() => handleRemoveComment(item._id)}
                  title={`Remove Comment ${item._id}`}>
                  x
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      <Comment
        tip={props.tipDetails._id}
        user={props.loggedInUser._id}
        updateTip={props.getTipDetails}
      />
    </div>
  );
}

export default CommentSection;
