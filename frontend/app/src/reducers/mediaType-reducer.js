import {
  UPDATE_MEDIA,
  UPDATE_CMEDIA,
} from '../constants/constant';

const initialMediaObject = {
  title: '',
  MediaType: '',
  MediaData: [],
};

export function mediaTypeReducer(
// currentMediaTap = 'Youtube' on start
  state = 'Youtube', { type, payload },
) {
  switch (type) {
    case UPDATE_CMEDIA:
      return payload.mediaType;
    default:
      return state;
  }
}

export function mediaObjectReducer(
  // MediaObject = initialMediaObject
  state = initialMediaObject, { type, payload },
) {
  switch (type) {
    case UPDATE_MEDIA:
      return payload.mediaType;
    default:
      return state;
  }
}
