import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService";
import { setAuthToken } from "../services/http";

const AuthContext = createContext(null);

const STORAGE_KEY = "learning-platform-auth";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.token) {
          setAuthToken(parsed.token);
          return parsed;
        }
      }
    } catch (error) {
      console.error("Failed to parse auth from storage", error);
    }
    return { token: "", user: null };
  });

  useEffect(() => {
    if (auth.token) {
      setAuthToken(auth.token);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
    } else {
      setAuthToken("");
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [auth]);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    setAuth(response);
    return response;
  };

  const register = async (payload) => {
    const response = await authService.register(payload);
    setAuth(response);
    return response;
  };

  const logout = () => {
    setAuth({ token: "", user: null });
  };

  const value = useMemo(
    () => ({
      token: auth.token,
      user: auth.user,
      isAuthenticated: Boolean(auth.token),
      login,
      register,
      logout,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
