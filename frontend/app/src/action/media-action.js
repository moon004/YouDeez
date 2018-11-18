import axios from 'axios';
import { addToDB } from '../utils/indexdb';
import {
  UPDATE_MEDIA,
  UPDATE_CMEDIA,
  UPDATE_DOWNLOAD,
  UPDATE_DOWNLOAD_FINISH,
  UPDATE_DOWNLOAD_ERR,
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
          ID: MediaObj.ID,
          songObject: MediaObj.songObject,
        },
      },
    },
  };
}

export function updateDownloadAct(downloadObject) {
  return (dispatch) => {
    console.log('dlObject', downloadObject);
    dispatch({
      type: UPDATE_DOWNLOAD,
      payload: {
        state: downloadObject.state, // Get the state from download button
        buffer: null,
        songObject: null,
      },
    });
    console.log('In updateDownloadAct, payload:', downloadObject);
    axios.request({
      responseType: 'blob',
      url: `http://localhost:8888/api/youtube/download?q=${downloadObject.ID}`,
      method: 'get',
      headers: {
        'Content-Type': 'audio/m4a',
        Accept: 'audio/m4a',
      },
    }).then((response) => {
      const { songName, songImg, songDur } = downloadObject.songObj;
      addToDB(songName, songImg, songDur, response.data);
      dispatch({
        type: UPDATE_DOWNLOAD_FINISH,
        payload: {
          state: 'finish',
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
