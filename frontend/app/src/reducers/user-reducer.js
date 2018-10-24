import { UPDATE_USER, SHOW_ERROR } from '../constants/constant';

export default function userReducer(state = '', { type, payload }) {
  switch (type) {
    case UPDATE_USER:
      return payload.user;
    case SHOW_ERROR:
      return payload.user;
    default:
      return state;
  }
}
