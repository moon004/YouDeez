import axios from 'axios';
import { addToDB, callUpdateDB } from '../utils/indexdb';
import {
  UPDATE_MEDIA,
  UPDATE_CMEDIA,
  UPDATE_DOWNLOAD,
  UPDATE_DOWNLOAD_FINISH,
  UPDATE_DOWNLOAD_ERR,
  DOWNLOAD_PROGRESS_INIT,
  dynamicDNS,
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
  return (dispatch) => {
    dispatch({
      type: UPDATE_DOWNLOAD,
      payload: {
        state: 'idle',
        buffer: null,
        songObject: {
          songName: MediaObj.songObject.songName,
        },
      },
    });
    dispatch({
      type: UPDATE_MEDIA,
      payload: {
        mediaObj: {
          MediaType: MediaObj.MType,
          MediaData: {
            ID: MediaObj.ID,
            songObject: MediaObj.songObject,
          },
        },
      },
    });
  };
}

export function updateDownloadAct(downloadObject, MainWrapper) {
  return (dispatch) => {
    dispatch({
      type: DOWNLOAD_PROGRESS_INIT,
      payload: {
        state: 'progress',
      },
    });
    axios.request({
      responseType: 'text',
      url: `${dynamicDNS}/api/download?q=${downloadObject.Id}&ut=getsize`,
      method: 'get',
    }).then((response) => {
      // Get Size request
      dispatch({
        type: DOWNLOAD_PROGRESS_INIT,
        payload: {
          state: 'progressing',
          songName: downloadObject.songObj.songName,
          totalsize: response.data,
        },
      });
    }).catch((err) => {
      dispatch({ type: UPDATE_DOWNLOAD_ERR, payload: err });
    });
    axios.request({
      responseType: 'blob', //   just send user token to both youtube or deezer download
      url: `${dynamicDNS}/api/download?q=${downloadObject.Id}&ut=download`,
      method: 'get',
      headers: {
        'content-type': 'audio/mp4',
        Accept: 'audio/mp4',
      },
    }).then((response) => {
      // Download song request
      const {
        songName, songImg, songDur, songArtist, songAlbum,
      } = downloadObject.songObj;
      addToDB(songName, songImg, songDur, songArtist, songAlbum, response.data);
      callUpdateDB(MainWrapper);
      dispatch({
        type: UPDATE_DOWNLOAD_FINISH,
        payload: {
          state: 'idle',
          buffer: response.data,
          songObject: downloadObject.songObj,
        },
      });
    })
      .catch((err) => {
        dispatch({ type: UPDATE_DOWNLOAD_ERR, payload: err });
      });
  };
}
