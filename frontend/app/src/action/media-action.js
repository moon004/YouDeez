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
      mediaObj: {
        MediaType: MediaObj.MType,
        MediaData: {
          Url: MediaObj.Url,
        },
      },
    },
  };
}
