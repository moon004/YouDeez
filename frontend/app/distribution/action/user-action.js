'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = updateUser;
exports.showError = showError;
exports.apiRequest = apiRequest;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _constant = require('../constants/constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateUser(newUser) {
  return {
    type: _constant.UPDATE_USER,
    payload: {
      user: newUser
    }
  };
}

function showError() {
  return {
    type: _constant.SHOW_ERROR,
    payload: {
      user: 'ERROR!!'
    }
  };
}

function apiRequest() {
  return function (dispatch) {
    _jquery2.default.ajax({
      url: 'http://google.com',
      success: function success() {
        console.log('Successs');
      },
      error: function error() {
        console.log('ERROR');
        dispatch(showError());
      }
    });
  };
}