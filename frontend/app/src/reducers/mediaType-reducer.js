import {
  UPDATE_MEDIA,
  UPDATE_CMEDIA,
  UPDATE_DOWNLOAD,
  UPDATE_DOWNLOAD_FINISH,
  UPDATE_DOWNLOAD_ERR,
} from '../constants/constant';

const initialMediaObject = {
  MediaType: '',
  MediaData: {
    ID: '', // ID of video or track
  },
};

const initialDownloadState = {
  state: '',
  songObject: {
    songName: '',
  },
};

export function mediaTypeReducer(
// currentMediaTap = 'Youtube' on start
  state = 'Search', { type, payload },
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
      return payload.mediaObj;
    default:
      return state;
  }
}

export function mediaDownloadReducer(
  state = initialDownloadState, { type, payload },
) {
  switch (type) {
    case UPDATE_DOWNLOAD:
      return payload;
    case UPDATE_DOWNLOAD_FINISH:
      return payload;
    case UPDATE_DOWNLOAD_ERR:
      return payload;
    default:
      return state;
  }
}
