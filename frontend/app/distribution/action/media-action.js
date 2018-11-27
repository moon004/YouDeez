'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCurrentMediaAct = updateCurrentMediaAct;
exports.updateMediaObjAct = updateMediaObjAct;
exports.updateDownloadAct = updateDownloadAct;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _indexdb = require('../utils/indexdb');

var _constant = require('../constants/constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateCurrentMediaAct(currentMediaType) {
  return {
    type: _constant.UPDATE_CMEDIA,
    payload: {
      mediaType: currentMediaType
    }
  };
}

function updateMediaObjAct(MediaObj) {
  return function (dispatch) {
    dispatch({
      type: _constant.UPDATE_DOWNLOAD,
      payload: {
        state: 'idle',
        buffer: null,
        songObject: {
          songName: MediaObj.songObject.songName
        }
      }
    });
    dispatch({
      type: _constant.UPDATE_MEDIA,
      payload: {
        mediaObj: {
          MediaType: MediaObj.MType,
          MediaData: {
            ID: MediaObj.ID,
            songObject: MediaObj.songObject
          }
        }
      }
    });
  };
}

function updateDownloadAct(downloadObject) {
  return function (dispatch) {
    console.log('dlObject', downloadObject);
    dispatch({
      type: _constant.UPDATE_DOWNLOAD,
      payload: {
        state: 'progress', // Change state when download button is clicked
        buffer: null,
        songObject: {
          songName: downloadObject.songObj.songName
        }
      }
    });
    _axios2.default.request({
      responseType: 'blob',
      url: 'http://localhost:8888/api/download?q=' + downloadObject.Id,
      method: 'get',
      headers: {
        'Content-Type': 'audio/mp4',
        Accept: 'audio/mp4'
      }
    }).then(function (response) {
      var _downloadObject$songO = downloadObject.songObj,
          songName = _downloadObject$songO.songName,
          songImg = _downloadObject$songO.songImg,
          songDur = _downloadObject$songO.songDur,
          songArtist = _downloadObject$songO.songArtist,
          songAlbum = _downloadObject$songO.songAlbum;

      (0, _indexdb.addToDB)(songName, songImg, songDur, songArtist, songAlbum, response.data);
      dispatch({
        type: _constant.UPDATE_DOWNLOAD_FINISH,
        payload: {
          state: 'idle',
          buffer: response.data,
          songObject: downloadObject.songObj
        }
      });
    }).catch(function (err) {
      dispatch({ type: _constant.UPDATE_DOWNLOAD_ERR, payload: err });
    });
  };
}