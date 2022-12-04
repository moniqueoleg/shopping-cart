import { useContext } from 'react';

import AuthContext from 'context/auth/auth-provider';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('useAuthContext must be inside AuthProvider');
  }

  return context;
};
