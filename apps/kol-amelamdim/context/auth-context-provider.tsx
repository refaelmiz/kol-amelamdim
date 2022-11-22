import React from 'react';
import axios from '../api';

interface AuthContextTypes {
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
  checkAuthentication: () => Promise<{ success: boolean }>;
}

export const AuthContext = React.createContext<AuthContextTypes>({
  isAuthenticated: false,
  setAuthenticated: () => null,
  checkAuthentication: () => null,
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = React.useState<boolean>(false);

  const checkAuthentication = async () => {
    const { data } = await axios.get('/api/me');
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        checkAuthentication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
