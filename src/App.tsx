import "./index.scss"
import {Routes, Route} from "react-router-dom"
import Header from "./components/Header/Header";
import {Suspense, useEffect} from "react";
import {api} from "./api/api";
import {useNavigate} from "react-router-dom";
import {Alert} from "@mui/material";
import {LoginAsync} from "./pages/Login/Login.async";
import {TableAsync} from "./pages/Table/Table.async";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {errorAC} from "./store/appReducer/appActions";


const App = () => {

  const dispatch = useDispatch()
  const err = useSelector<AppRootStateType, string>(state => state.app.error)
  const navigate = useNavigate()


  const logOutHandler = () => {
    sessionStorage.clear()
    navigate('/')
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(errorAC(''))
    }, 3000)
  }, [err])


  useEffect(() => {
    api.autoSignIn((path: string) => navigate(path))
  }, [])

  return (
    <>
      <Header callback={logOutHandler}/>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={"/table"} element={<TableAsync/>}/>
          <Route path={"/"} element={<LoginAsync/>}/>
        </Routes>
      </Suspense>
      {err && <Alert variant="filled" severity="error">
        {err}
      </Alert>}
    </>
  )
}
export default App
