import {
  FETCH_OBJ_START,
  FETCH_SUCCESS_YOU,
  FETCH_SUCCESS_DEEZ,
  FETCH_ERROR_YOU,
  FETCH_ERROR_DEEZ,
  ACOMPLETE_SUC,
  ACOMPLETE_ERR,
  SEARCH,
  SEARCHING,
  SEARCHDONE,
  ERROR_STATE,
} from '../constants/constant';

const initialStateDeez = {
  fetchState: SEARCH,
  error: null,
};

const initialAC = {
  currentState: '',
  autoCompData: [],
};

export function SearchReducer(
  state = initialStateDeez, { type, payload },
) {
  switch (type) {
    case FETCH_OBJ_START:
      return { ...state, fetchState: SEARCHING };
    case FETCH_SUCCESS_YOU: // F = FETCH
      return { ...state, fetchState: SEARCHDONE, dataYou: payload };
    case FETCH_SUCCESS_DEEZ:
      return { ...state, fetchState: SEARCHDONE, dataDeez: payload };
    case FETCH_ERROR_YOU:
      return { ...state, fetchState: ERROR_STATE, error: payload };
    case FETCH_ERROR_DEEZ:
      return { ...state, fetchState: ERROR_STATE, error: payload };
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
      return { ...state, currentState: 'Success', autoCompData: payload };
    case ACOMPLETE_ERR:
      return { ...state, currentState: 'Fail', autoCompData: payload };
    default:
      return state;
  }
}
