import {TypeDataTable} from "./types";

export const SET_TABLE = "SET_TABLE"
export const ADD_TABLE_DATA = " ADD_TABLE_DATA"
export const DELETE_TABLE_DATA = 'DELETE_TABLE_DATA'
export const CHANGE_TABLE_DATA = 'CHANGE_TABLE_DATA'

export const setDataTable = (data: TypeDataTable) => {
  return {
    type: SET_TABLE,
    payload: data
  } as const
}

export const addTableDataAC = (data: TypeDataTable) => {
  return {
    type: ADD_TABLE_DATA,
    payload: data
  } as const
}

export const deleteTableDataAC = (id: string) => {
  return {
    type: DELETE_TABLE_DATA,
    payload: id
  } as const
}

export const changeTableDataAC = (id: string, key: string, value: string) => {
  return {
    type: CHANGE_TABLE_DATA,
    id,
    key,
    value
  } as const
}