import axios from 'axios';

const initialState = {
  data: [],
  isLoading: false,
  hasMore: false
}

const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PHOTOS':
      return {
        ...state,
        data: state.data.concat(action.data),
        hasMore: action.data.length > 0,
        isLoading: false
      }
    case 'LOADING_PHOTOS':
      return {
        ...state,
        isLoading: true
      }
    default:
      return state;
  }
}

export const getPhotos = (page, limit) => async dispatch => {
  dispatch(setLoadingPhotos());
  const photos = await axios.get(`http://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`);
  return dispatch({
    type: 'GET_PHOTOS',
    data: photos.data
  })
}

const setLoadingPhotos = () => {
  return {
    type: 'LOADING_PHOTOS'
  }
}

export default photoReducer;