import {
  UPDATE_MEDIA,
  UPDATE_CMEDIA,
} from '../constants/constant';

export function updateMediaType(playMediaType) {
  return {
    type: UPDATE_MEDIA,
    payload: {
      mediaType: playMediaType,
    },
  };
}

export function updateCurrentMedia(currentMediaType) {
  return {
    type: UPDATE_CMEDIA,
    payload: {
      mediaType: currentMediaType,
    },
  };
}
