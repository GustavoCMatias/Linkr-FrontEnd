import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import apiAuth from "../services/apiAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function keepLoggedIn(data) {
    const { token } = data;
    console.log('AQUI TA O TOKEN', token);

    apiAuth
      .returnUser(token)
      .then((res) => {
        const loggedUser = res.data;

        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("tokenUser", JSON.stringify(token));

        console.log('LOGGED AQUI', loggedUser);

        setUser(loggedUser);
        setToken(token);
        navigate("/timeline");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const logUserOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("tokenUser");
    setUser(null);
    setToken(null);
    navigate("/");
  };


  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        token,
        keepLoggedIn,
        loading,
        logUserOut,
        setUser,
        setToken,
        setLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};