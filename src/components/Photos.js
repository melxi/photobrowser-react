import React, { useRef, useCallback } from 'react'
import { connect } from 'react-redux'
import Photo from './Photo';

const Photos = (props) => {
  const { photos, isLoading, hasMore, setCurrentPage } = props;
  // console.log(props);

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

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="gallery_photos">
      {photos.map((photo, index) => {
        if (photos.length === index + 1) return <Photo photo={photo} key={photo.id} ref={lastPhotoElementRef}/>
        return <Photo photo={photo} key={photo.id} />
      })}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    photos: state.photos.data,
    isLoading: state.photos.isLoading,
    hasMore: state.photos.hasMore
  }
}

export default connect(mapStateToProps)(Photos);