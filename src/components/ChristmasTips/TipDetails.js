import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';
import { withRouter } from 'react-router-dom';

function TipDetails(props) {
  const [tipDetails, setTipDetails] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { params } = props.match;

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/tips/${params.id}`
        //`https://sustainable-christmas-server.herokuapp.com/tips/${params._id}`
      )
      .then((foundTip) => {
        console.log(foundTip.data.comments);
        setTipDetails(foundTip.data);
        setLoaded(true);
      });
  }, [loaded, params.id]);

  return props.loggedInUser ? (
    <div>
      {loaded ? (
        <div>
          <h3>{tipDetails.title}</h3>
          <p>By {tipDetails.author.firstName}</p>
          {tipDetails.comments &&
            tipDetails.comments.map((item) => <p key={item._id}>{item.content}</p>)}
          <Comment tip={tipDetails._id} user={props.loggedInUser._id} />
        </div>
      ) : (
        <div>Loading tip</div>
      )}
    </div>
  ) : (
    <div>{loaded ? <h3>{tipDetails.title}</h3> : <div>Loading tip</div>}</div>
  );
}

export default withRouter(TipDetails);
