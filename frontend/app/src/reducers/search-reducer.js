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

// const initialState = {
//   fetchState: SEARCH, // initial state will take the value here.
//   error: null,
//   dataYou: [{
//     contentDetails: {
//       duration: 'PT31M31S',
//     },
//     id: 'lGaneyDfyls',
//     snippet: {
//       channelId: 'UCfWQfOBi6zDLiKhR79xXxmg',
//       channelTitle: 'Elu Tran',
//       description: "Determination!↵↵↵↵(Doesn't have the cleanest",
//       publishedAt: '2015-09-17T23:43:56.000Z',
//       thumbnails: {
//         medium: {
//           url: 'https://i.ytimg.com/vi/lGaneyDfyls/mqdefault.jpg',
//           height: 180,
//           width: 320,
//         },
//       },
//       title: 'Undertale OST - Hopes And Dreams (Intro) & Save The World Extended ',
//     },
//     statistics: {
//       viewCount: '19684560',
//     },
//   }],
//   dataDeez: [],
// };

const initialStateDeez = {
  fetchState: SEARCH,
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
  dataDeez: [{
    id: 476921142,
    title: 'Egao No Hana',
    duration: 283,
    artist: {
      id: 1413597,
      name: 'Goose house',
      link: 'https://www.deezer.com/artist/1413597',
      picture_small: 'https://e-cdns-images.dzcdn.net/images/artist/665d6918b653486a9a0bec661643458b/56x56-000000-80-0-0.jpg',
    },
    album: {
      id: 59656462,
      title: 'Flight',
      cover: 'https://api.deezer.com/album/59656462/image',
    },
  }],
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
