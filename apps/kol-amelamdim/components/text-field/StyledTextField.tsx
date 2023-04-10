import React from 'react';
import { styled, TextField } from '@mui/material';

const StyledField = styled(TextField)`
  font-size: 1.4rem;
  background: white;
  border-radius: 30px;
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
    >
      {props.children}
    </StyledField>
  );
};

export default StyledTextField;