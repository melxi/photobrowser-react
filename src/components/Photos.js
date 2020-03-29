import React, { useEffect, useState, useRef, useCallback } from 'react'
import { connect } from 'react-redux'
import { getPhotos } from "../reducers/photoReducer";
import Photo from './Photo';
import Loader from './Loader';

const Photos = (props) => {
  const { photos, isLoading, hasMore } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    props.getPhotos(currentPage, limit);
  }, [currentPage]);


  const observer = useRef();
  const lastPhotoElementRef = useCallback(
    node => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );
 
  return (
    <>
      <div className="gallery_photos">
        {photos.map((photo, index) => {
          if (photos.length === index + 1) {
            return <Photo photo={photo} key={index} ref={lastPhotoElementRef}/>
        } else {
          return <Photo photo={photo} key={index} />}
        })}
      </div>
      {isLoading && <Loader />}
    </>
  )
}

const mapStateToProps = state => {
  console.log(state.photos.data)
  return {
    photos: state.photos.data,
    isLoading: state.photos.isLoading,
    hasMore: state.photos.hasMore
  }
}

export default connect(mapStateToProps, { getPhotos })(Photos);