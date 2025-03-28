import { createContext, useContext, useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { authUserInfo } from "../api"; // Ensure correct API import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  console.log("✅ AuthProvider initialized"); // Debugging log

  // ✅ Function to fetch user details from the backend
  const fetchUserData = async (uid) => {
    try {
      const response = await authUserInfo(uid); // ✅ Await API call
      setUser(response.data);
      // console.log("✅ User data fetched:", response.data);

      
      
    } catch (error) {
      console.error("❌ Error fetching user data:", error);
      handleLogout();
    }
  };

  // ✅ Optimized Logout Function (useCallback to prevent re-renders)
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    // navigate("/login");
  }, []);

  // ✅ useEffect - Runs ONLY ONCE ([]) to prevent infinite re-renders
  useEffect(() => {
    console.log("🔄 useEffect in AuthProvider triggered");

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      console.log("🔍 Decoded token:", decoded);

      if (decoded.exp * 1000 < Date.now()) {
        console.warn("⏳ Token expired. Logging out...");
        handleLogout();
      } else {
        // setUser(decoded); 
        console.log(decoded , "at auth provider");
        // console.log(user ," trying to print token");
        
        // ✅ Set user state with decoded token data
        // fetchUserData(decoded.uid); // ✅ Fetch user details from backend
      }
    } catch (error) {
      console.error("❌ Invalid token:", error);
      handleLogout();
    }
  }, []); // ✅ Runs only once on mount

  return <AuthContext.Provider value={{ user, handleLogout ,fetchUserData }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
