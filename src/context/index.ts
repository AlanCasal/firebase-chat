import { createContext } from 'react';
import AuthContextValue from './useAuthContextValue';

export type AuthContextData = ReturnType<typeof AuthContextValue>;

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export default AuthContext;
