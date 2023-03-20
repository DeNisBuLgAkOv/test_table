import {addTableDataAC, changeTableDataAC, deleteTableDataAC, setDataTable} from "./tableActions";


export type tableStateType = {
  tableData: Array<TypeDataTable>
}

export type TypeDataTable = {
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string
  employeeSigDate: string
  employeeSignatureName: string
  id?: string
}

export type setDataTableType = ReturnType<typeof setDataTable>
export type addTableDataACType = ReturnType<typeof addTableDataAC>
export type deleteTableDataACType = ReturnType<typeof deleteTableDataAC>
export type changeTableDataACType = ReturnType<typeof changeTableDataAC>

export type TableActionsType = setDataTableType | addTableDataACType | deleteTableDataACType | changeTableDataACType