import {ADD_TABLE_DATA, CHANGE_TABLE_DATA, DELETE_TABLE_DATA, SET_TABLE} from "./tableActions";
import {TableActionsType, tableStateType} from "./types";


const initialState: tableStateType = {
  tableData: []
}


export const TableReducer = (state = initialState, action: TableActionsType) => {
  switch (action.type) {
    case SET_TABLE: {
      return {...state, tableData: action.payload}
    }
    case ADD_TABLE_DATA: {
      return {...state, tableData: [...state.tableData, action.payload]};
    }
    case DELETE_TABLE_DATA: {
      return {...state, tableData: state.tableData.filter(el => el.id !== action.payload)}
    }
    case CHANGE_TABLE_DATA: {
      return {
        ...state,
        tableData: state.tableData.map(el => el.id === action.id ? {...el, [action.key]: action.value} : el)
      }
    }
    default :
      return state
  }

}