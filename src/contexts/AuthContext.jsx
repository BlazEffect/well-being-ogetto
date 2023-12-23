import {createContext, useState, useEffect, useMemo} from "react";
import * as authService from "@/services/AuthService";

export const AuthContext = createContext({});

const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authData, setAuthData] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setAuthData(JSON.parse(storedData));
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const login = (tokenResponse) => {
    setIsLoading(true);
    authService.login(tokenResponse);
    setIsLoggedIn(true);
    setIsLoading(false);
  }

  const logout = () => {
    authService.logout();
    setIsLoggedIn(false);
  }

  const authValue = useMemo(() => {
    return {
      isLoggedIn,
      isLoading,
      authData,
      login,
      logout
    };
  }, [isLoggedIn, isLoading, authData]);

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
