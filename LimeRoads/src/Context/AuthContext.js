import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedRole = localStorage.getItem("role");

    if (storedToken && storedRole) {
      setIsLoggedIn(true);
      setRole(storedRole);
    }
  }, []);

  const login = (token, role) => {
    console.log("Logging in...");
    localStorage.setItem("authToken", token);
    localStorage.setItem("role", role);
    setIsLoggedIn(true);
    setRole(role);
  };

  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole("");
    window.location.href = "/Profile";
  };
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

