import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';

const CustomSelect = styled(Select)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '5px',
  fontSize: '1em',
}));

function StyledSelect(props) {
  return (
    <CustomSelect
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
    >
      {props.children}
    </CustomSelect>
  );
}

export default StyledSelect;
