import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useFormik} from "formik";
import {FC, useState} from "react";
import classes from "./login.module.scss"
import {api} from "../../api/api";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {loadingAC} from "../../store/appReducer/appActions";

const Login: FC = () => {

  const navigate = useNavigate()


  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik({

    validate: (values) => {
      if (!values.email) {
        return {
          email: "Email is requir"
        }
      }
      if (values.password !== "password") {
        return {
          password: "Password is requi"
        }
      }
    },
    initialValues: {
      email: 'user',
      password: 'password',
    },
    onSubmit: values => {
      sendToken(values.email, values.password)
    },
  });

  const sendToken = async (email: string, password: string) => {
    dispatch(loadingAC(true))
    await api.getJWT(email, password, () => {
      navigate("/table")
      dispatch(loadingAC(false))
    })
  }
  console.log(showPassword)

  return <Grid container justifyContent={'center'}>
    <Grid item justifyContent={'center'}>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <FormControl>
            <InputLabel style={{marginTop: "10px"}} htmlFor="email">Email</InputLabel>
            <FilledInput style={{marginTop: "10px"}} id={'email'}  {...formik.getFieldProps("email")}/>
            {formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}
          </FormControl>

          <FormControl>
            <FilledInput id={"password"} type={showPassword ? 'text' : 'password'} className={classes.mn}
                         {...formik.getFieldProps("password")}
                         endAdornment={
                           <InputAdornment position="end">
                             <IconButton
                               aria-label="toggle password visibility"
                               onClick={handleClickShowPassword}
                               onMouseDown={handleMouseDownPassword}
                               edge="end"
                             >
                               {showPassword ? <VisibilityOff/> : <Visibility/>}
                             </IconButton>
                           </InputAdornment>
                         }
            />
            {formik.errors.password ?
              <div style={{color: "red", marginBottom: "10px"}}>{formik.errors.password}</div> : null}
          </FormControl>
          <Button type={'submit'} variant={'contained'} color={'primary'}>
            Login
          </Button>
        </FormGroup>
      </form>
    </Grid>
  </Grid>
}
export default Login;