import React from "react";
import styled from "styled-components";
import Button from "./buttons/button";
import { useLocation, useNavigate } from "react-router";
import { AddRounded, WebRounded } from "@mui/icons-material";

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
    // flex-direction: column;
    gap: 10px;
  }
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let path = location.pathname.split("/");

  const gotoCreatePost = () => {
    navigate("/post");
  };

  const gotoHome = () => {
    navigate("/");
  };

  const gotoLogin = () => {
    navigate("/login");
  };

  return (
    <Container>
      {/* Brand Logo */}
      <img
        src="brandLogo.gif"
        alt="Logo"
        style={{
          height: "80px",
          objectFit: "contain",
          cursor: "pointer",
          borderRadius: "50%",
        }}
        onClick={gotoHome}
      />

      {/* Brand Name */}
      <h1
        style={{
          marginLeft: "15px", 
        }}
        onClick={gotoHome}
      >
        Gem AI
      </h1>

      {/* Center Section for Existing Button */}
      <CenterSection>
        {path[1] === "post" ? (
          <Button
            text="Explore Posts"
            leftIcon={<WebRounded style={{ fontSize: "18px" }} />}
            onClick={gotoHome}
            type="secondary"
          />
        ) : (
          <Button
            text="Create New Post"
            leftIcon={<AddRounded style={{ fontSize: "18px" }} />}
            onClick={gotoCreatePost}
          />
        )}
      </CenterSection>

      {/* Login Button */}
      <Button
        text="Login"
        onClick={gotoLogin}
        type="primary"
        style={{
          marginLeft: "auto",
        }}
      />
    </Container>
  );
};

export default Navbar;