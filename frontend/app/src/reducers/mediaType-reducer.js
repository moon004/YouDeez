import {
  UPDATE_MEDIA,
  UPDATE_CMEDIA,
} from '../constants/constant';

export default function mediaTypeReducer(
  state = null, { type, payload },
) {
  switch (type) {
    case UPDATE_MEDIA:
      return payload.mediaType;
    case UPDATE_CMEDIA:
      return payload.mediaType;
    default:
      return state;
  }
}
