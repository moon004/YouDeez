import $ from 'jquery';

import { 
    UPDATE_USER,
    SHOW_ERROR,
 } from '../constants/constant'

export function updateUser(newUser) {
    return {
        type: UPDATE_USER,
        payload: {
            user: newUser
        }
    }
}

export function showError() {
    return {
        type: SHOW_ERROR,
        payload: {
            user: 'ERROR!!'
        }
    }
}

export function apiRequest() {
    return dispatch => {
        $.ajax({
            url:'http://google.com',
            success() {
                console.log('Successs');
            },
            error() {
                console.log("ERROR");
                dispatch(showError() );
            }
        });
    }
}