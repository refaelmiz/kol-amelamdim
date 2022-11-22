import { useState, createContext } from 'react';

type AlertTypes = 'success' | 'warning';

interface AlertContextTypes {
  alertMessage: string;
  setAlertMessage: (isAlertOpen: string) => void;
  alertType: AlertTypes;
  setAlertType: (color: AlertTypes) => void;
}

export const AlertContext = createContext<AlertContextTypes>({
  alertMessage: '',
  setAlertMessage: () => null,
  alertType: 'success',
  setAlertType: () => null,
});

export interface ContextProps {
  children?: React.ReactNode;
}

export function AlertContextProvider({ children }: ContextProps) {
  const [alertType, setAlertType] = useState<AlertTypes>('success');
  const [alertMessage, setAlertMessage] = useState('');

  return (
    <AlertContext.Provider
      value={{
        alertMessage,
        setAlertMessage,
        alertType,
        setAlertType,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}

export default AlertContextProvider;
