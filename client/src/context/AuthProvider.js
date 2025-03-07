import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Ensure correct import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    console.log("useauth called");
    
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Fix: Wrap `logout` in useCallback to prevent unnecessary re-renders
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }, [navigate]); // ✅ Depend only on `navigate`

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        
        if (decoded.exp * 1000 < Date.now()) {
          logout(); // ✅ Now logout is defined before this useEffect runs
        } else {
          setUser(decoded);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    } else {
    //   logout();
    }
  }, [logout]); // ✅ Now logout is stable & does not cause unnecessary re-renders

  return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
