import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getPhoto } from '../reducers/photoReducer';
import Loader from "./Loader";

const PhotoDetails = props => {
  const { id, title, url } = props.photo;

  useEffect(() => {
    props.getPhoto(props.match.params.id);
  }, [])

  if (props.isLoading) {
    return <Loader />
  }

  return (
    <div className="gallery_photo gallery_photo-details">
      <img src={url} alt="placeholder" />
      <div className="photo_body">
        <h3>{title}</h3>
      </div>
      <div className="photo_footer">
        <div className="photo_id">{id}</div>
        <div className="photo_link">
          <Link to="/">Return</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.photos.isLoading,
    photo: state.photos.item
  };
};

export default connect(mapStateToProps, { getPhoto })(PhotoDetails);
