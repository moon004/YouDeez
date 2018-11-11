import axios from 'axios';
import {
  FETCH_OBJ_START,
  FETCH_ERROR,
  FETCH_SUCCESS_YOU,
  FETCH_SUCCESS_DEEZ,
  ACOMPLETE_ERR,
  ACOMPLETE_SUC,
} from '../constants/constant';

const getYoutube = value => (
  axios.get(`http://localhost:8888/api/youtube?mr=3&q=${value}`)
);

const getDeezer = value => (
  axios.get(`http://localhost:8888/api/deez?q=${value}`)
);
// Set all request headers to have Access-Control-Allow-Origin
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// Action Creator
export function fetchObjStartAct(value) {
  return (dispatch) => {
    dispatch({ type: FETCH_OBJ_START, payload: 'FETCHING' });
    console.log('axios log:', value);
    axios.all([
      getYoutube(value), getDeezer(value),
    ])
      .then(axios.spread((youResp, deezResp) => {
        console.log('Deezer:', youResp.data.items);
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
    axios.get(`http://localhost:8888/api/youtube/autoComplete?q=${value}`)
      .then((response) => {
        console.log('Success!', response.data[1]);
        dispatch({ type: ACOMPLETE_SUC, payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: ACOMPLETE_ERR, payload: err });
      });
  };
}
