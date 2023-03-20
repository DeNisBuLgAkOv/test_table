import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string, name: string, id: string) => void
  name: string,
  id: string
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(props.value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.value);
  }
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title, props.name, props.id);
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode
    ? <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>

    : <div style={{display: 'flex', justifyContent: "space-between"}}>
      <span>{props.value}</span>
      <EditIcon onClick={activateEditMode} style={{color: 'gray', width: '20px', height: '20px', cursor: 'pointer'}}/>
    </div>
});
