import {
  UPDATE_MEDIA,
  UPDATE_CMEDIA,
} from '../constants/constant';

export function updateCurrentMediaAct(currentMediaType) {
  return {
    type: UPDATE_CMEDIA,
    payload: {
      mediaType: currentMediaType,
    },
  };
}

export function updateMediaObjAct(MediaObj) {
  return {
    type: UPDATE_MEDIA,
    payload: {
      mediaType: {
        MediaType: '',
        MediaData: {
          Url: `https://www.youtube.com/watch?v=${MediaObj}`,
        },
      },
    },
  };
}
