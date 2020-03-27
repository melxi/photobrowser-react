import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { getPhotos } from "./reducers/photoReducer";
import Photos from "./components/Photos";

function App({ getPhotos, photos, isLoading, hasMore }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    getPhotos(currentPage, limit);
  }, [currentPage]);

  return (
    <div>
      <Photos setCurrentPage={setCurrentPage}/>
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
