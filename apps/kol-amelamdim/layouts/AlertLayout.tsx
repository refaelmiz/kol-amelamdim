import { PropsWithChildren, useContext } from 'react';
import { AlertContext } from '../context/alert-context-provider';
import { Alert } from '../components';

export const AlertLayout = (props: PropsWithChildren) => {
  const { alertMessage, setAlertMessage, alertType } = useContext(AlertContext);

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertMessage('');
  };

  return (
    <>
      <Alert
        open={!!alertMessage}
        severity={alertType}
        onClose={handleCloseAlert}
      >
        {alertMessage}
      </Alert>
      {props.children}
    </>
  );
};
