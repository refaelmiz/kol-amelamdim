import { styled, Table } from '@mui/material';
import React from 'react';

const CustomTable = styled(Table)`
  border-radius: 20px;
  min-width: 600px;
  th {
    font-weight: bold;
  }
`;

function StyledTable(props) {
  return <CustomTable>{props.children}</CustomTable>;
}

export default StyledTable;
