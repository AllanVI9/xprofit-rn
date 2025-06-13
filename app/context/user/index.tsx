import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the User type
import { User } from '@/services/user-interface';

// Define the shape of the context
type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider component to wrap app and provide user state
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};

export { UserProvider };
export default useUserContext;
