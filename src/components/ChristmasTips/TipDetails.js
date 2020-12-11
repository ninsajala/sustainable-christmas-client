import './Tips.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import AddFavorite from './DetailsComponents/AddFavorite';
import RemoveFavorite from './DetailsComponents/RemoveFavorite';
import CommentSection from './DetailsComponents/CommentSection';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

function TipDetails(props) {
  const [tipDetails, setTipDetails] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { params } = props.match;

  const getTipDetails = () => {
    axios
      .get(
        `https://sustainable-christmas-server.herokuapp.com/tips/${params.id}`
      )
      .then((foundTip) => {
        setTipDetails(foundTip.data);
        setLoaded(true);
      });
  };

  useEffect(getTipDetails, [params.id]);

  const handleDeleteTip = () => {
    axios
      .delete(
        `https://sustainable-christmas-server.herokuapp.com/tips/${tipDetails._id}`
      )
      .then(() => props.history.push(`/tips`));
  };

  const checkIfOwner = () => {
    if (tipDetails.author._id === props.loggedInUser._id) {
      return (
        <div className='form-group button-group'>
          <Link to={`/tips/edit/${tipDetails._id}`}>
            <button className='btn btn-warning btn-sm'>
              <i className='fas fa-edit'></i>
            </button>
          </Link>

          <button className='btn btn-danger btn-sm' onClick={handleDeleteTip}>
            <i className='fas fa-trash-alt'></i>
          </button>
        </div>
      );
    }
  };

  const checkIfFavorite = () => {
    if (
      props.loggedInUser.favorites.find(
        (element) => element._id === tipDetails._id
      )
    ) {
      return (
        <RemoveFavorite
          loggedInUser={props.loggedInUser}
          tipDetails={tipDetails}
          updateTip={getTipDetails}
          checkFavorite={checkIfFavorite}
          getUser={props.getUser}
        />
      );
    } else {
      return (
        <AddFavorite
          loggedInUser={props.loggedInUser}
          tipDetails={tipDetails}
          updateTip={getTipDetails}
          checkFavorite={checkIfFavorite}
          getUser={props.getUser}
        />
      );
    }
  };

  return props.loggedInUser ? (
    <div>
      {loaded ? (
        <div className='tipDetails'>
          <h3>{tipDetails.title}</h3>
          <div className='tipDetailHeaderInfo'>
            <div className='authorSection'>
              {checkIfOwner()}
              <p>
                Written by {}
                <Link to={`/profile/${tipDetails.author._id}`}>
                  <b>
                    {tipDetails.author.firstName} {tipDetails.author.lastName}
                  </b>
                </Link>
              </p>
            </div>
            <div className='favoriteSection'>
              <p>
                {tipDetails.addedToFavorites.length} times added to favorites
              </p>
              {checkIfFavorite()}
            </div>
          </div>
          <div className='tipDetailsMain'>
            <div
              className='detailsPicture'
              style={{
                backgroundImage: `url(${tipDetails.picture})`,
              }}></div>
            <p>{tipDetails.content}</p>
            {tipDetails.extraInfo && (
              <a href={tipDetails.extraInfo} rel='noreferrer' target='_blank'>
                <button className='btn btn-warning'>More info</button>
              </a>
            )}
          </div>
          <div className='tipDetailsBottomSection'>
            <CommentSection
              getTipDetails={getTipDetails}
              tipDetails={tipDetails}
              loggedInUser={props.loggedInUser}
              getUser={props.getUser}
            />
            <div className='shareSection'>
              <p>Share</p>
              <FacebookShareButton
                url={`https://www.sustainable-christmas.net/`}>
                {' '}
                <FacebookIcon size={30} round={true} />
              </FacebookShareButton>

              <TwitterShareButton
                url={`https://www.sustainable-christmas.net/`}>
                {' '}
                <TwitterIcon size={30} round={true} />
              </TwitterShareButton>

              <LinkedinShareButton
                url={`https://www.sustainable-christmas.net/`}>
                {' '}
                <LinkedinIcon size={30} round={true} />
              </LinkedinShareButton>

              <WhatsappShareButton
                url={`https://www.sustainable-christmas.net/`}>
                {' '}
                <WhatsappIcon size={30} round={true} />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      ) : (
        <p className='logInWarning'>Loading details..</p>
      )}
    </div>
  ) : (
    <p className='logInWarning'>
      Please log in to see this page <br />
      <Link to={'/login'}>
        <button className='btn btn-warning'>Login</button>
      </Link>
    </p>
  );
}

export default withRouter(TipDetails);
