import axios from 'axios';
import {
  FETCH_OBJ_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  API_KEY,
  API_KEY1,
  GOOGLE_SUGGEST,
  ACOMPLETE_ERR,
  ACOMPLETE_SUC,
} from '../constants/constant';

// Action Creator
export function fetchObjStart() {
  return (dispatch) => {
    dispatch({ type: FETCH_OBJ_START, payload: 'FETCHING' });
    axios.({
      method: 'get', 
      url: 'https://dog.ceo/api/breeds/image/random',
    })
    .then((response) => {
      console.log(response.data);
      dispatch({ type: FETCH_SUCCESS, payload: response.data.message });
    })
    .catch((err) => {
      console.log('axios Get FAILED');
      dispatch({ type: FETCH_ERROR, payload: err });
    });
  };
}


export function getAutoComp(value) {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `${GOOGLE_SUGGEST}&key=${API_KEY1}&q=${value}`,
    })
      .then((response) => {
        console.log('Success!', response.data);
        dispatch({ type: ACOMPLETE_SUC, payload: response.data });
      })
      .catch((err) => {
        console.log('Sad got error: ', err);
        dispatch({ type: ACOMPLETE_ERR, payload: err });
      });
  };
}
