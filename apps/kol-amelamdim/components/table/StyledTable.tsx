import { styled, Table } from '@mui/material';
import React from 'react';

const CustomTable = styled(Table)`
  border-radius: 20px;
`;

function StyledTable(props) {
  return <CustomTable>{props.children}</CustomTable>;
}

export default StyledTable;
