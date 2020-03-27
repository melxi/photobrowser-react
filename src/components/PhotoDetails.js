import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

const PhotoDetails = props => {
  const { id, title, url } = props.photo;

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

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    isLoading: state.photos.isLoading,
    photo: state.photos.data.find(photo => photo.id === parseInt(id))
  };
};

export default connect(mapStateToProps)(PhotoDetails);
