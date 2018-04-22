import { combineReducers } from 'redux'
import {
  RECEIVE_CENSUSDATA,
  VIZ_CLICK,
  CLEAR_SELECTIONS,
  CHANGE_DATALABEL
} from '../actions'


function selectionLabels(state = { "message": [], "highlightStates": [] }, action) {
  switch (action.type) {
    case RECEIVE_CENSUSDATA:
      return { ...state, "highlightStates":[], "message": [] };
    case VIZ_CLICK:
      return { ...state, ...{ "message": action.message, "highlightStates": action.highlightStates } };
    case CLEAR_SELECTIONS:
      return { ...state, ...{ "message": [], "highlightStates": [] } };
    case CHANGE_DATALABEL:
      return {...state, [action.group]: action.option}
    default:
      return state;
  }
 
}


function censusData(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CENSUSDATA:
      return Object.assign({}, state, {
        [action.group]: action.data
      });
    default:
      return state;
  }
}



const censusReducer = combineReducers({
  selectionLabels,
  censusData
})

export default censusReducer;