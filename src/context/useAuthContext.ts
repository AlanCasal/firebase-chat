import { useContext } from 'react';
import AuthContext, { AuthContextData } from './index';

const useAuthContext = (): AuthContextData => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider'
    );
  }

  return value;
};

export default useAuthContext;
