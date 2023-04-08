import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import './table.scss'
import DeleteIcon from '@mui/icons-material/Delete'
import BasicModal from "../../components/ModalWindow/ModalWindow";
import {api} from "../../api/api";
import {
  addTableDataAC,
  changeTableDataAC,
  deleteTableDataAC,
  setDataTable
} from "../../store/tableReducer/tableActions";
import {FC, useEffect} from "react";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import {errorAC, loadingAC} from "../../store/appReducer/appActions";
import {TypeDataTable} from "../../store/tableReducer/types";


const Table: FC = () => {
  // @ts-ignore
  const data = useSelector<AppRootStateType, TypeDataTable[]>(state => state.table.tableData)
  const dispatch = useDispatch()

  useEffect(() => {
    api.getTable()
      .then(res => dispatch(setDataTable(res.data.data)))
      .catch(err => dispatch(errorAC('нет данных')))
  }, [])


  const deleteTableHandler = (id: string) => {
    dispatch(loadingAC(true))
    api.deleteData(id)
      .then(res => console.log(res))
      .catch(err => dispatch(errorAC('ошибка удаления')))
      .finally(()=>   dispatch(loadingAC(false)))

    dispatch(deleteTableDataAC(id))

  }

  const AddTableHandle = (data: TypeDataTable, handleClose: () => void) => {
    dispatch(loadingAC(true))
    api.addData(data)
      .then(res =>
        {throw new Error('sdfds')}
        // dispatch(addTableDataAC(res.data.data))
      )
      .catch(err => dispatch(errorAC('ошибка добавления данных')))
      .finally(handleClose,dispatch(loadingAC(false)))

  }

  const changeDataHandler = (newValue: string, keyData: string, idData: string) => {
    dispatch(loadingAC(true))
    const stringTable: TypeDataTable[] = data.filter(el => el.id === idData)
    const obj = stringTable[0]
    for (let key in obj) {
      if (key === keyData) {
        // @ts-ignore
        obj[key] = newValue
      }
    }
    api.changeData(idData, obj)
      .then(res =>
          dispatch(changeTableDataAC(idData, keyData, newValue))
        // {throw new Error('sdfds')}
      )
      .catch(err => {
        dispatch(errorAC('ошибка редактирования'))
        dispatch(loadingAC(false))
      })



  }


  return (
    <>
      <table>
        <tr>
          <th>companySigDate</th>
          <th>companySignatureName</th>
          <th>documentName</th>
          <th>documentStatus</th>
          <th> employeeNumber</th>
          <th> employeeSigDate</th>
          <th>employeeSignatureName</th>
        </tr>
        {data?.map(elem =>
          <tr key={elem?.id}>
            <td>{elem.companySigDate}</td>
            <td><EditableSpan id={elem.id} name={'companySignatureName'} value={elem.companySignatureName}
                              onChange={changeDataHandler}/></td>
            <td><EditableSpan id={elem.id} name={'documentName'} value={elem?.documentName}
                              onChange={changeDataHandler}/></td>
            <td><EditableSpan id={elem.id} name={'documentStatus'} value={elem?.documentStatus}
                              onChange={changeDataHandler}/></td>
            <td><EditableSpan id={elem.id} name={'employeeNumber'} value={elem?.employeeNumber}
                              onChange={changeDataHandler}/></td>
            <td>{elem.employeeSigDate}</td>
            <td><EditableSpan id={elem.id} name={'employeeSignatureName'} value={elem?.employeeSignatureName}
                              onChange={changeDataHandler}/></td>
            <td onClick={() => deleteTableHandler(elem.id)}><DeleteIcon/></td>
          </tr>
        )}
      </table>
      <div className={'addList'}>
        <BasicModal handleAddTable={AddTableHandle}/>
      </div>
    </>
  );
};

export default Table;