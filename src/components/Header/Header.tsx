import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";

type PropsType = {
  callback: () => void
}

export default function Header(props: PropsType) {

  const loading = useSelector<AppRootStateType, boolean>(state => state.app.loading)

  return (
    <>
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              News
            </Typography>
            {sessionStorage.getItem('x-auth') &&
              <Button onClick={() => props.callback()} color="inherit">LogOut</Button>}
          </Toolbar>
        </AppBar>
      </Box>
      {loading &&
        <Box sx={{width: '100%'}}>
          <LinearProgress/>
        </Box>}
    </>
  )

}