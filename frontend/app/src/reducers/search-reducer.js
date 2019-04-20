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
  dataYou: [{
    contentDetails: { duration: 'PT4M19S' },
    id: 'SnXkhkEvNIM',
    snippet: {
      channelId: 'UCFDL0NuxUBAvvu1PnIwW2ww',
      title: 'Goose House oto No Naru Hou e Yeah Haha Hopes and Dreams',
      channelTitle: 'Goose house',
      description: '★2017年10月のGoose house Streaming Liveは↵10/28 20:00（JAPAN TIME）START！↵詳しくはhttp://goosehouse.jp↵↵↵▼Goose house OFFICIAL INFORMATION↵----------------------------------------------------------------------------------------------------------↵［OFFICIAL WEB］http://www.goosehouse.jp↵［TWITTER］https://twitter.com/GoosehouseJP ↵［INSTAGRAM］https://www.instagram.com/goosehousejp/↵［FACEBOOK］https://www.facebook.com/Goosehousejp-213238282024922/↵［EC SHOP］http://goosehouse.shop-pro.jp↵---------------------------------------------------------------------------------------------------------↵↵2014年11月19日リリース！↵フジテレビ“ノイタミナ”アニメ「四月は君の嘘」↵オープニング・テーマとして書き下ろされた1曲。↵↵通常版と期間生産限定をリリース。↵期間生産限定は、CD＋MV-DVDの２枚組です。↵良かったらお手に取ってください。↵↵●iTunes ↵https://itunes.apple.com/jp/album/guangrunara-ep/id937057170↵↵通常版と期間生産限定をリリース。↵期間生産限定は、CD＋MV-DVDの２枚組です。↵良かったらお手に取ってください。↵↵通常版　 http://www.amazon.co.jp/dp/B00NLLNGT2↵期間限定版　http://www.amazon.co.jp/dp/B00NLLNGKG',
      publishedAt: '2014-11-02T10:04:41.000Z',
      thumbnails: {
        medium: {
          url: 'https://i.ytimg.com/vi/SnXkhkEvNIM/mqdefault.jpg',
        },
      },
    },
    statistics: {
      viewCount: '37882008',
    },
  }],
  dataDeez: [{
    id: '476921152',
    title: 'Oto No Naru Houe (Goose house Live House Tour 2017 Tokyo)',
    duration: 326,
    artist: {
      id: 1413597,
      link: 'https://www.deezer.com/artist/1413597',
      name: 'Goose house',
      picture_small: 'https://e-cdns-images.dzcdn.net/images/artist//56x56-000000-80-0-0.jpg',
    },
    album: {
      cover: 'https://api.deezer.com/album/59656462/image',
      id: 59656462,
      title: 'Flight',
    },
  }],
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
    case FETCH_SUCCESS_YOU:
      console.log('datayou payload', payload);
      return { ...state, fetchState: SEARCHDONE, dataYou: payload };
    case FETCH_SUCCESS_DEEZ:
      console.log('dataDeez payload', payload);
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
