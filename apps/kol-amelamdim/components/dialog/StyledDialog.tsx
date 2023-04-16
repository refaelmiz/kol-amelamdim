import { Dialog, styled } from '@mui/material';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';

const StyledDialog = styled(Dialog)`
  button {
    width: 100%;
  }

  form {
    padding: 0 1em;

    input {
      width: 100%;
    }
  }

  input {
    font-size: 1.4rem;
    @media ${!MOBILE_QUERY} {
      font-size: 1.2rem;
    }
  }

  label {
    font-size: 1.4rem;
    @media ${!MOBILE_QUERY} {
      font-size: 1.2rem;
    }
  }

  .MuiDialog-paper {
    border-radius: 40px;
    color: black;
    @media ${!MOBILE_QUERY} {
      border-radius: 20px;
    }
  }
`;

export default StyledDialog;
