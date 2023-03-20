import {ERROR, LOADING} from "./appActions";
import {appActions, stateAppType} from "./types";


const initialState: stateAppType = {
  loading: false,
  error: ''
}


export const AppReducer = (state = initialState, action: appActions) => {
  switch (action.type) {
    case LOADING:
      return {...state, loading: action.payload}
    case ERROR:
      return {...state, error: action.payload}
    default:
      return state
  }
}
