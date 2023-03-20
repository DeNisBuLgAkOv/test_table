export const LOADING = "LOADING"
export const ERROR = "ERROR"

export const loadingAC = (load: boolean) => {
  return {
    type: LOADING,
    payload: load
  } as const
}

export const errorAC = (err: string) => {
  return {
    type: ERROR,
    payload: err
  } as const
}