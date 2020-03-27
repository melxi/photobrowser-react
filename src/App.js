import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { getPhotos } from "./reducers/photoReducer";
import Photos from "./components/Photos";

function App({ getPhotos, photos, isLoading, hasMore }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(20);

  useEffect(() => {
    getPhotos(currentPage, limit);
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
    <div>
      <Photos setCurrentPage={setCurrentPage}/>
      {/* {photos.map((photo, index) => {
        console.log(photo);
        if (photos.length === index + 1) {
          return (
            <div
              className="gallery_photo"
              key={photo.id}
              ref={lastPhotoElementRef}
            >
              <img src={photo.thumbnailUrl} alt="placeholder" />
              <h2>{photo.title}</h2>
            </div>
          );
        } else {
          return (
            <div className="gallery_photo" key={photo.id}>
              <img src={photo.thumbnailUrl} alt="placeholder" />
              <h2>{photo.title}</h2>
            </div>
          );
        }
      })} */}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    photos: state.photos.data,
    isLoading: state.photos.isLoading,
    hasMore: state.photos.hasMore
  };
};

export default connect(mapStateToProps, { getPhotos })(App);
