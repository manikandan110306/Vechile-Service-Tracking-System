import React, { createContext, useContext, useState } from 'react';
import authApi from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  const login = async (payload) => {
  const user = await authApi.login(payload); // backend returns full user object
  setUser(user);
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};


  const signup = async (data) => {
    setLoading(true);
    const res = await authApi.signup(data);
    setLoading(false);
    return res;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
