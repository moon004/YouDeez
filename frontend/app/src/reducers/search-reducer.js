import {
  FETCH_OBJ_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  ACOMPLETE_SUC,
  ACOMPLETE_ERR,

} from '../constants/constant';

const initialState = {
  fetchState: '',
  error: null,
  data: [],
};

export default function SearchReducer(
  state = initialState, { type, payload },
) {
  switch (type) {
    case FETCH_OBJ_START:
      return { ...state };
    case FETCH_SUCCESS: // F = FETCH
      return { ...state, fetchState: 'There you go', data: payload };
    case FETCH_ERROR:
      return { ...state, fetchState: 'Error', error: payload };
    case ACOMPLETE_SUC:
      return { currentState: 'Success', data: payload };
    case ACOMPLETE_ERR:
      return { currentState: 'Fail', data: payload };
    default:
      return state;
  }
}
