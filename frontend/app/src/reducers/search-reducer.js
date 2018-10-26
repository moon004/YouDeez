import {
  FETCH_OBJ_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  ACOMPLETE_SUC,
  ACOMPLETE_ERR,

} from '../constants/constant';

const initialState = {
  fetchState: 'Search',
  error: null,
  data: [],
};

const initialAC = {
  currentState: '',
  autoCompData: [],
};

export function SearchReducer(
  state = initialState, { type, payload },
) {
  switch (type) {
    case FETCH_OBJ_START:
      return { ...state };
    case FETCH_SUCCESS: // F = FETCH
      return { ...state, fetchState: 'There you go', data: payload };
    case FETCH_ERROR:
      return { ...state, fetchState: 'Error', error: payload };
    default:
      return state;
  }
}

// SAC = Search Auto Complete
export function SACReducer(
  state = initialAC, { type, payload },
) {
  switch (type) {
    case ACOMPLETE_SUC:
      console.log('reducer', payload);
      return { ...state, currentState: 'Success', autoCompData: payload };
    case ACOMPLETE_ERR:
      return { ...state, currentState: 'Fail', autoCompData: payload };
    default:
      return state;
  }
}
