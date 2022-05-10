import { createContext, useContext, useState } from 'react';
import { getUser, signInUser, signUpUser } from '../services/user';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser || { email: null });

  const login = async (email, password) => {
    const authenticatedUser = await signInUser({ email, password });

    if (authenticatedUser) {
      setUser(authenticatedUser)
    }
  };

  const signUp = async (email, password) => {
    const authenticatedUser = await signUpUser({ email, password });

    if (authenticatedUser) {
      setUser(authenticatedUser)
    };

  };

  const logout = () => {
    setUser({ email: null });
  };

  return (
    <UserContext.Provider value={{ user, login, signUp, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('You must use useUser within context');
  }

  return context;
}
