import {createContext, useState, useEffect, useMemo} from "react";
import {login, logout} from "@/services/AuthService";

export const AuthContext = createContext({});

const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authData, setAuthData] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setAuthData(storedData);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const authValue = useMemo(() => {
    return {
      isLoggedIn,
      isLoading,
      authData,
      login,
    };
  }, [isLoggedIn, isLoading, authData]);

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
