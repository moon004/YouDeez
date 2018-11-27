'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchObjStartAct = fetchObjStartAct;
exports.getAutoCompAct = getAutoCompAct;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _constant = require('../constants/constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getYoutube = function getYoutube(value) {
  return _axios2.default.get('http://localhost:8888/api/youtube?mr=15&q=' + value);
};

var getDeezer = function getDeezer(value) {
  return _axios2.default.get('http://localhost:8888/api/deez?q=' + value);
};
// Set all request headers to have Access-Control-Allow-Origin
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// Action Creator
function fetchObjStartAct(value) {
  return function (dispatch) {
    dispatch({ type: _constant.FETCH_OBJ_START, payload: 'FETCHING' });
    _axios2.default.all([getYoutube(value), getDeezer(value)]).then(_axios2.default.spread(function (youResp, deezResp) {
      dispatch({ type: _constant.FETCH_SUCCESS_YOU, payload: youResp.data.items });
      dispatch({ type: _constant.FETCH_SUCCESS_DEEZ, payload: deezResp.data.data });
    })).catch(function (err) {
      dispatch({ type: _constant.FETCH_ERROR, payload: err });
    });
  };
}

function getAutoCompAct(value) {
  return function (dispatch) {
    if (value !== '') {
      _axios2.default.get('http://localhost:8888/api/youtube/autoComplete?q=' + value).then(function (response) {
        dispatch({ type: _constant.ACOMPLETE_SUC, payload: response.data });
      }).catch(function (err) {
        dispatch({ type: _constant.ACOMPLETE_ERR, payload: err });
      });
    } else {
      dispatch({ type: _constant.ACOMPLETE_SUC, payload: [] });
    }
  };
}