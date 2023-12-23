import {createContext, useState, useEffect, useMemo} from "react";
import {login, logout} from "@/services/AuthService";

export const AuthContext = createContext({});

const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authData, setAuthData] = useState({});

  useEffect(() => {
    const storedJwt = localStorage.getItem("jwt1");
    if (storedJwt) {
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
      logout,
    };
  }, [isLoggedIn, isLoading, authData]);

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
