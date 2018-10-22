import {
  FETCH_OBJ_START,
  FETCH_SUCCESS,
  FETCH_ERROR
} from '../constants/constant'
import axios from 'axios'

//Action Creator
export function fetchObjStart(fetchApiStart) {
  return {
    //The Action
    type: FETCH_OBJ_START,
    payload: {
      fetchtStats: fetchApiStart
    }
  }
}

export function apiReq() {
  return dispatch => {
    axios.get("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        dispatch({type: FETCH_SUCCESS, payload: response.data})
      })
      .catch((err) => {
        dispatch({type: FETCH_ERROR, payload: err})
      })
  }
}