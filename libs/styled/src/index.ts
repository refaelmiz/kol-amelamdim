import { Dialog as MuiDialog, Container, styled, Button } from '@mui/material';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';

export const StyledButton = styled(Button)`
  border-radius: 30px;
  padding: 2px 30px 6px 20px;
  color: white;
  & .MuiButton-startIcon svg {
    font-size: 30px;
  }
`;

export const Dialog = styled(MuiDialog)`
  .MuiPaper-root {
    width: 750px;
    min-height: 550px;
    padding: 30px;

    @media ${MOBILE_QUERY} {
      width: auto;
      min-height: 450px;
      padding: 15px;
      margin: 15px;
    }
  }
`;

export const FormError = styled('div')`
  margin: 10px 0;
  color: ${(props) => props.theme.palette.error.main};
`;

export const StyledPageContainer = styled(Container)`
  padding-top: 105px;
  min-height: 90vh;
  padding-bottom: 50px;
  @media ${MOBILE_QUERY} {
    padding-top: 110px;
  }
`;
