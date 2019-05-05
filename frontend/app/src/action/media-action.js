import axios from 'axios';
import { addToDB, callUpdateDB } from '../utils/indexdb';
import {
  UPDATE_MEDIA,
  UPDATE_CMEDIA,
  UPDATE_DOWNLOAD,
  UPDATE_DOWNLOAD_FINISH,
  UPDATE_DOWNLOAD_ERR,
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
      type: UPDATE_DOWNLOAD,
      payload: {
        state: 'progress', // Change state when download button is clicked
        buffer: null,
        songObject: {
          songName: downloadObject.songObj.songName,
        },
      },
    });
    axios.request({
      responseType: 'blob', //   just send user token to both youtube or deezer download
      url: `${dynamicDNS}/api/download?q=${downloadObject.Id}&ut=${downloadObject.UserToken}`,
      method: 'get',
      headers: {
        'content-length': '123',
        'content-type': 'audio/mp4',
        Accept: 'audio/mp4',
      },
      onDownloadProgress(progressEvent) {
        console.log('progressEvent: ', progressEvent);
      },
    }).then((response) => {
      const {
        songName, songImg, songDur, songArtist, songAlbum,
      } = downloadObject.songObj;
      console.log('response: ', response);
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
