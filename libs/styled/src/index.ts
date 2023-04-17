import {
  Button,
  Checkbox,
  Container,
  Dialog as MuiDialog,
  InputLabel,
  Link as MUILink,
  styled,
  Typography,
} from '@mui/material';
import { MOBILE_QUERY } from '@kol-amelamdim/constants';

export const StyledButton = styled(Button)`
  border-radius: 100px;
  padding: 2px 30px 6px 20px;
  color: white;
  font-size: 1.2rem;

  & .MuiButton-startIcon svg {
    font-size: 26px;
  }
`;

export const StyledLangButton = styled(StyledButton)`
  color: black;
  padding: 2px 20px 6px 20px;
  gap: 10px;
  @media ${!MOBILE_QUERY} {
    border-color: transparent;
  }
`;

export const StyledButtonXL = styled(StyledButton)`
  font-weight: bold;
  font-size: 30px;
  letter-spacing: 2px;
  padding: 6px 40px 10px;

  &.Mui-disabled {
    background-color: rgba(255, 255, 255, 0.4) !important;
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
  margin: 30px 0 0;
  padding: 10px;
  color: white;
  border: 1px dashed white;
  background: ${(props) => props.theme.palette.error.main + '80'};
`;

export const StyledPageContainer = styled(Container)`
  min-height: calc(100vh - 104px);
  max-width: 100% !important;
  padding: 8em 0 0 !important;
  @media ${MOBILE_QUERY} {
    padding: 3em 0 0 !important;
  }
  gap: 10em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SectionTitle = styled(Typography)`
  text-align: center;
  border-bottom: 6px solid ${(props) => props.theme.palette.secondary.main};
  width: fit-content;
  margin-bottom: 1em;
  padding: 0 6px;
`;

export const StyledMUILink = styled(MUILink)({
  color: 'white',
  textDecoration: 'underline',
  fontFamily: 'theme.fontFamily.body.0',
  '&:hover': {
    color: 'white',
    textDecoration: 'none',
  },
});

export const StyledCheckbox = styled(Checkbox)`
  & .MuiSvgIcon-root {
    fill: white;
  }
`;

export const HiddenInputLabel = styled(InputLabel)`
  font-size: 0 !important;
`;
