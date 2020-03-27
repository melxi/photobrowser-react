import React, { forwardRef }  from 'react';
import { Link } from 'react-router-dom';

const Photo = (props, ref) => {
  return (
    <div className="gallery_photo" ref={ref}>
      <img src={props.photo.thumbnailUrl} alt="placeholder"/>
      <div className="photo_body">
        <h3>{props.photo.title}</h3>
      </div>
      <div className="photo_footer">
        <div className="photo_id">
          {props.photo.id}
        </div>
        <div className="photo_link">
          <Link to={'/' + props.photo.id}>
            View more
          </Link>
        </div>
      </div>
    </div>
  )
}

export default forwardRef(Photo);