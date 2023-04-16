import React from 'react';
import { styled, TextField } from '@mui/material';

const StyledField = styled(TextField)`
  width: 100%;
`;

const StyledTextField = (props) => {
  return (
    <StyledField
      InputProps={{
        placeholder: props.placeholder,
        value: props.value,
        error: props.error,
        onChange: props.onChange,
        rows: props.rows,
        multiline: props.multiline,
        style: {
          borderRadius: '10px',
          background: 'white',
          fontSize: '1.4rem',
        },
      }}
      label={props.label}
      name={props.name}
      required={props.required}
    >
      {props.children}
    </StyledField>
  );
};

export default StyledTextField;
