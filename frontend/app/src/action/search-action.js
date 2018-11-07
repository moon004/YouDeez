import axios from 'axios';
import {
  FETCH_OBJ_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  // API_KEY,
  API_KEY1,
  GOOGLE_SUGGEST,
  ACOMPLETE_ERR,
  ACOMPLETE_SUC,
} from '../constants/constant';

// Action Creator
export function fetchObjStartAct(value) {
  return (dispatch) => {
    dispatch({ type: FETCH_OBJ_START, payload: 'FETCHING' });
    console.log('axios log:', value);
    axios({
      method: 'get',
      url: `http://localhost:8888/api/youtube?mr=3&q=${value}`,
    })
      .then((response) => {
        console.log(response.data.items);
        dispatch({ type: FETCH_SUCCESS, payload: response.data.items });
      })
      .catch((err) => {
        dispatch({ type: FETCH_ERROR, payload: err });
      });
  };
}


export function getAutoCompAct(value) {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `${GOOGLE_SUGGEST}&key=${API_KEY1}&q=${value}`,
    })
      .then((response) => {
        console.log('Success!', response.data[1]);
        dispatch({ type: ACOMPLETE_SUC, payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: ACOMPLETE_ERR, payload: err });
      });
  };
}
