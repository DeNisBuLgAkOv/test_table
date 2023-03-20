import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState} from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import {useFormik} from "formik";
import {FormGroup} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type PropsType = {
  handleAddTable: (data: any, handleClose: Function) => void
}

export default function BasicModal(props: PropsType) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const arr = [
    'companySignatureName',
    'documentName',
    'documentStatus',
    'documentType',
    'employeeNumber',
    'employeeSignatureName']

  const formik = useFormik({

    initialValues: {
      companySigDate: new Date(),
      companySignatureName: "",
      documentName: "",
      documentStatus: "",
      documentType: "",
      employeeNumber: "",
      employeeSigDate: new Date(),
      employeeSignatureName: ""
    },
    onSubmit: (values, {resetForm}) => {
      props.handleAddTable(values, handleClose)
      resetForm()
    },
  });


  return (
    <div>
      <PlaylistAddIcon onClick={handleOpen} color="primary"/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Box sx={style}>
              <FormControl>
                <Typography id="modal-modal-title" variant="h6" component="h3">
                  Добавить данные в таблицу
                </Typography>

                <div>
                  {arr.map(el => {
                    return (
                      <div style={{display: "flex", justifyContent: "space-between", marginTop: "5px"}}>
                        <span>{el}</span>
                        <input type={"text"} {...formik.getFieldProps(el)}/>
                      </div>
                    )
                  })}
                </div>
              </FormControl>
              <Button style={{marginTop: "10px"}} type={'submit'} variant={'contained'} color={'primary'}>
                Отправить
              </Button>
            </Box>
          </FormGroup>
        </form>
      </Modal>
    </div>
  );
}