import React from "react";
import styled from "styled-components";
import Button from "./buttons/button";
import {  useNavigate } from "react-router";
import { AddRounded, AccountCircleRounded } from "@mui/icons-material";

const Container = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.menu_primary_text};
  font-weight: bold;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);

  @media only screen and (max-width: 600px) {
    padding: 8px 12px;
    font-size: 10px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    height: 60px;
    object-fit: contain;
    border-radius: 50%;
  }

  h1 {
    margin-left: 15px;
    font-size: 22px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media only screen and (max-width: 600px) {
    gap: 10px;
  }
`;
const Navbar = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  // Example state to track login
  const isLoggedIn = localStorage.getItem("token") !== null;

  const gotoCreatePost = () => {
    navigate("/post");
  };

  const gotoHome = () => {
    navigate("/");
  };

  const gotoLogin = () => {
    navigate("/login");
  };

  const gotoProfile = () => {
    navigate("/profile");
  };

  const logout = () => {
    // Clear localStorage or any other session storage
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <Container>
      {/* Brand Logo and Name */}
      <BrandContainer onClick={gotoHome}>
        <img src="brandLogo.gif" alt="Logo" />
        <h1>Gem AI</h1>
      </BrandContainer>

      {/* Right Section */}
      <RightSection>
        {isLoggedIn && (
          <>
            <Button
              text="Create New Post"
              leftIcon={<AddRounded style={{ fontSize: "18px" }} />}
              onClick={gotoCreatePost}
              type="primary"
            />
            <Button
              text="Profile"
              leftIcon={<AccountCircleRounded style={{ fontSize: "18px" }} />}
              onClick={gotoProfile}
              type="primary"
            />
            <Button
              text="Logout"
              onClick={logout}
              type="secondary"
            />
          </>
        )}
        {!isLoggedIn && (
          <Button
            text="Login"
            onClick={gotoLogin}
            type="primary"
          />
        )}
      </RightSection>
    </Container>
  );
};


export default Navbar;






// const Container = styled.div`
//   flex: 1;
//   background: ${({ theme }) => theme.navbar};
//   color: ${({ theme }) => theme.menu_primary_text};
//   font-weight: bold;
//   font-size: 22px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0px 50px; 
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);

//   @media only screen and (max-width: 600px) {
//   padding: 8px 12px;
//   font-size: 10px;
//   flex-direction: column;
//   align-items: center;
//   gap: 10px;
// }
// @media only screen and (max-width: 600px) {
//   padding: 8px 12px;
//   font-size: 10px;
//   flex-direction: column;
//   align-items: center;
//   gap: 10px;
// }

// `;

// const CenterSection = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex: 1;
// `;

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   let path = location.pathname.split("/");

//   const gotoCreatePost = () => {
//     navigate("/post");
//   };

//   const gotoHome = () => {
//     navigate("/");
//   };

//   const gotoLogin = () => {
//     navigate("/login");
//   };

//   return (
//     <Container>
//       {/* Brand Logo */}
//       <img
//         src="brandLogo.gif"
//         alt="Logo"
//         style={{
//           height: "80px",
//           objectFit: "contain",
//           cursor: "pointer",
//           borderRadius: "50%",
//         }}
//         onClick={gotoHome}
//       />

//       {/* Brand Name */}
//       <h1
//         style={{
//           marginLeft: "15px", 
//         }}
//         onClick={gotoHome}
//       >
//         Gem AI
//       </h1>

//       {/* Center Section for Existing Button */}
//       <CenterSection>
//         {path[1] === "post" ? (
//           <Button
//             text="Explore Posts"
//             leftIcon={<WebRounded style={{ fontSize: "18px" }} />}
//             onClick={gotoHome}
//             type="secondary"
//           />
//         ) : (
//           <Button
//             text="Create New Post"
//             leftIcon={<AddRounded style={{ fontSize: "18px" }} />}
//             onClick={gotoCreatePost}
//           />
//         )}
//       </CenterSection>

//       {/* Login Button */}
//       <Button
//         text="Login"
//         onClick={gotoLogin}
//         type="primary"
//         style={{
//           marginLeft: "auto",
//         }}
//       />
//     </Container>
//   );
// };

// export default Navbar;