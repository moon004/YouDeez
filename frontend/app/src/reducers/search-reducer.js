import {
  FETCH_OBJ_START,
  FETCH_SUCCESS_YOU,
  FETCH_SUCCESS_DEEZ,
  FETCH_ERROR,
  ACOMPLETE_SUC,
  ACOMPLETE_ERR,
  SEARCH,
  SEARCHING,
  SEARCHDONE,
  ERROR_STATE,
} from '../constants/constant';

const initialState = {
  fetchState: SEARCH, // initial state will take the value here.
  error: null,
  dataYou: [{
    contentDetails: {
      duration: 'PT31M31S',
    },
    id: 'lGaneyDfyls',
    snippet: {
      channelId: 'UCfWQfOBi6zDLiKhR79xXxmg',
      channelTitle: 'Elu Tran',
      description: "Determination!↵↵↵↵(Doesn't have the cleanest",
      publishedAt: '2015-09-17T23:43:56.000Z',
      thumbnails: {
        medium: {
          url: 'https://i.ytimg.com/vi/lGaneyDfyls/mqdefault.jpg',
          height: 180,
          width: 320,
        },
      },
      title: 'Undertale OST - Hopes And Dreams (Intro) & Save The World Extended ',
    },
    statistics: {
      viewCount: '19684560',
    },
  }],
  dataDeez: null,
};

const initialStateDeez = {

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
      return { ...state, fetchState: SEARCHING };
    case FETCH_SUCCESS_YOU: // F = FETCH
      return { ...state, fetchState: SEARCHDONE, dataYou: payload };
    case FETCH_SUCCESS_DEEZ:
      return { ...state, fetchState: SEARCHDONE, dataDeez: payload };
    case FETCH_ERROR:
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
