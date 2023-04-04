import React from 'react';
import { Box } from '@mui/material';

const IconEmail = (props) => {
  return (
    <Box
      onClick={props.onClick}
      sx={{
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <svg
        width="26"
        height="21"
        viewBox="0 0 26 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.9583 2.75002L13.556 8.52119C13.1595 8.74723 12.6738 8.74723 12.2773 8.52119L3.875 2.75002H21.9583ZM21.9583 0.166687H3.875C1.73858 0.166687 0 1.90527 0 4.04169V16.9584C0 19.0948 1.73858 20.8333 3.875 20.8333H21.9583C24.0948 20.8333 25.8333 19.0948 25.8333 16.9584V4.04169C25.8333 1.90527 24.0948 0.166687 21.9583 0.166687V0.166687Z"
          fill="#406458"
        />
      </svg>
    </Box>
  );
};
export default IconEmail;
