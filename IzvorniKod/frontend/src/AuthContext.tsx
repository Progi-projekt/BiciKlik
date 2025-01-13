import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
  loggedIn: boolean;
  userRole: string | null;
  checkAuthStatus: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/auth/getAuthorization", { method: "GET", credentials: "include" });
      if (!response.ok) {
        throw new Error("Failed fetch");
      }
      const data = await response.json();
      if (data.loggedInAs) {
        setLoggedIn(true);
        setUserRole(data.role);
      } else {
        setLoggedIn(false);
        setUserRole(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoggedIn(false);
      setUserRole(null);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, userRole, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};