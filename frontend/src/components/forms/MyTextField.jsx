
import * as React from 'react';
import '../../App.css';
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form'

export default function MyTextField(props) {
  const { label, name, control } = props;
  return (


    <Controller
      name = {name}
      control = {control}
      defaultValue=""  // Asegura que el valor inicial no sea undefined
      render = {({
        field:{onChange, value},
        fieldState:{error},
        formState,

      }) =>(
          <TextField
      id="outlined-basic"
      onChange = {onChange}
      value={value || ""}  // Asegura que no sea undefined
      label={label}
      variant="outlined"
      className="myForm"
      error = {!!error}
      helperText = {error?.message}
    />
      )

    }
    />
  );
}
