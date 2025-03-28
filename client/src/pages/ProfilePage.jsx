import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { darkTheme } from "../utils/Theme";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Decode JWT to get user ID
import { authUserInfo } from "../api"; // ✅ API function to get user details

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${({ theme }) => theme.text_primary};
  background-color: ${({ theme }) => theme.bg};
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 500px;
  background-color: ${({ theme }) => theme.bgLight};
  border-radius: 15px;
  box-shadow: 0px 8px 20px ${({ theme }) => theme.shadow};
  padding: 2rem;
  text-align: center;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.primary};
  margin-bottom: 1rem;
`;

const UserName = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
`;

const UserEmail = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 1rem;
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const ProfilePage = () => {
  // const { user, fetchUserData, handleLogout } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.uid;

      const fetchUserData = async () => {
        try {
          const response = await authUserInfo(userId);
          setUserInfo(response.data);
          setLoading(false);
        } catch (error) {
          console.error("❌ Error fetching user:", error.message);
          setUserInfo([]);
          setLoading(false);
          // navigate("/login");
        }
      };

      fetchUserData();
    } catch (error) {
      console.error("❌ Invalid token:", error);
      setUserInfo([]);
      setLoading(false);
      // navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <ProfileContainer theme={darkTheme}>
      <ProfileBox theme={darkTheme}>
        <Avatar src="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png" alt="User Avatar" />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <UserName>{userInfo?.username || "Anonymous"}</UserName>
            <UserEmail>{userInfo?.email || "No email available"}</UserEmail>
          </>
        )}
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </ProfileBox>
    </ProfileContainer>
  );
};

export default ProfilePage;






// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { darkTheme } from "../utils/Theme";
// import { useNavigate } from "react-router-dom";
// // import { jwtDecode } from "jwt-decode"; // Import jwtDecode
// // import axios from "axios";

// const ProfileContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   color: ${({ theme }) => theme.text_primary};
//   background-color: ${({ theme }) => theme.bg};
// `;

// const ProfileBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 90%;
//   max-width: 500px;
//   background-color: ${({ theme }) => theme.bgLight};
//   border-radius: 15px;
//   box-shadow: 0px 8px 20px ${({ theme }) => theme.shadow};
//   padding: 2rem;
//   text-align: center;

//   @media screen and (max-width: 768px) {
//     width: 95%;
//     padding: 1.5rem;
//   }
// `;

// const Avatar = styled.img`
//   width: 120px;
//   height: 120px;
//   border-radius: 50%;
//   border: 3px solid ${({ theme }) => theme.primary};
//   margin-bottom: 1rem;
// `;

// const UserName = styled.h2`
//   font-size: 24px;
//   font-weight: 600;
//   color: ${({ theme }) => theme.text_primary};
//   margin-bottom: 0.5rem;
// `;

// const UserEmail = styled.p`
//   font-size: 16px;
//   color: ${({ theme }) => theme.text_secondary};
//   margin-bottom: 1rem;
// `;

// const LogoutButton = styled.button`
//   width: 100%;
//   padding: 0.8rem;
//   background-color: ${({ theme }) => theme.primary};
//   color: ${({ theme }) => theme.white};
//   font-size: 1rem;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-top: 1rem;

//   &:hover {
//     background-color: ${({ theme }) => theme.secondary};
//   }
// `;

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/login");
//       return;

//     }

    
//     try {
//       // const decoded = jwtDecode(token); // Decode JWT to get UID
//       // const userId = decoded.uid;

//       // const fetchUserData = async () => {
//       //   try {
//       //     const response = await axios.get(`http://localhost:8080/api/user/${userId}`);
//       //     setUser(response.data);
//       //   } catch (error) {
//       //     console.error("Error fetching user:", error);
//       //     navigate("/login"); // Redirect if unauthorized
//       //   }
//       // };

//       // fetchUserData();
//     } catch (error) {
//       console.error("Invalid token:", error);
//       navigate("/login");
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <ProfileContainer theme={darkTheme}>
//       <ProfileBox theme={darkTheme}>
//         <Avatar src="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png" alt="User Avatar" />
//         {/* {user ? ( */}
//           // <>
//             <UserName>
//               {/* {user.username} */}
//               harsh</UserName>
//             <UserEmail>
//               {/* {user.email} */}
//               harsh</UserEmail>
//           </>
//         {/* ) : ( */}
//           {/* <p>Loading...</p> */}
//         {/* )} */}
//         <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
//       </ProfileBox>
//     </ProfileContainer>
//   );
// };

// export default ProfilePage;
