import {errorAC, loadingAC} from "./appActions";


export type loadingACType = ReturnType<typeof loadingAC>
export type errorACType = ReturnType<typeof errorAC>

export type stateAppType = {
  loading: boolean
  error: string
}

export type appActions = loadingACType | errorACType