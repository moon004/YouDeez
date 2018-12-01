import axios from 'axios';
import {
  FETCH_OBJ_START,
  FETCH_ERROR,
  FETCH_SUCCESS_YOU,
  FETCH_SUCCESS_DEEZ,
  ACOMPLETE_ERR,
  ACOMPLETE_SUC,
  dynamicDNS,
} from '../constants/constant';

const getYoutube = value => (
  axios.get(`${dynamicDNS}/api/youtube?mr=15&q=${value}`)
);

const getDeezer = value => (
  axios.get(`${dynamicDNS}/api/deez?q=${value}`)
);
// Action Creator
export function fetchObjStartAct(value) {
  return (dispatch) => {
    dispatch({ type: FETCH_OBJ_START, payload: 'FETCHING' });
    axios.all([
      getYoutube(value), getDeezer(value),
    ])
      .then(axios.spread((youResp, deezResp) => {
        dispatch({ type: FETCH_SUCCESS_YOU, payload: youResp.data.items });
        dispatch({ type: FETCH_SUCCESS_DEEZ, payload: deezResp.data.data });
      }))
      .catch((err) => {
        dispatch({ type: FETCH_ERROR, payload: err });
      });
  };
}


export function getAutoCompAct(value) {
  return (dispatch) => {
    if (value !== '') {
      axios.get(`${dynamicDNS}/api/youtube/autoComplete?q=${value}`)
        .then((response) => {
          dispatch({ type: ACOMPLETE_SUC, payload: response.data });
        })
        .catch((err) => {
          dispatch({ type: ACOMPLETE_ERR, payload: err });
        });
    } else {
      dispatch({ type: ACOMPLETE_SUC, payload: [] });
    }
  };
}
