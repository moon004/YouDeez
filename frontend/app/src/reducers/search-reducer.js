import { 
  FETCH_OBJ_START,
  
} from '../constants/constant'

export default function SearchReducer(state=null,{type, payload}) {
  switch(type) {
    case FETCH_OBJ_START:
      return payload.fetchStats
    default: 
      return state
  }
}