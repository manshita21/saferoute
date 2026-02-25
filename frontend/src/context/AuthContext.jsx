import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage when app loads
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("saferouteUser"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // ✅ Login function
  const login = (data) => {
    localStorage.setItem("saferouteUser", JSON.stringify(data));
    setUser(data);
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("saferouteUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
