import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  getToken,
  saveAuth,
  logout as clearAuth,
} from "../utils/auth";

const AuthContext =
  createContext();

export const AuthProvider =
({
  children,
}) => {

  const [token,
    setToken] =
    useState(
      getToken()
    );

 const login =
(
  jwtToken,
  userId,
  email
) => {

  saveAuth(
    jwtToken,
    userId,
    email
  );

  setToken(
    jwtToken
  );

};

  const logout =
    () => {

      clearAuth();

      setToken(null);

    };

  return (

    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated:
          !!token,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

export const useAuth =
() =>
  useContext(
    AuthContext
  );