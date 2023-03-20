import {combineReducers, createStore} from "redux";
import {AppReducer} from "./appReducer/appReducer";
import {TableReducer} from "./tableReducer/tableReducer";


const rootReducer = combineReducers({
  app: AppReducer,
  table: TableReducer,
})


export const store = createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>


