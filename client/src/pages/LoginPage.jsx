import React, { useState } from "react";
import styled from "styled-components";
import { darkTheme } from "../utils/Theme";

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
`;

const LoginBox = styled.div`
  display: flex;
  width: 80%;
  max-width: 800px;
  background-color: ${({ theme }) => theme.bgLight};
  border-radius: 15px;
  box-shadow: 0px 8px 20px ${({ theme }) => theme.shadow};
  overflow: hidden;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    max-width: 95%;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bgDark};
  padding: 1rem;

  @media screen and (max-width: 768px) {
    height: 40%;
  }
`;

const BrandLogo = styled.img`
  max-width: 80%;
  max-height: 80%;
  border-radius: 15px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const DecorativeLine = styled.div`
  width: 4px;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
`;

const RightSection = styled.div`
  flex: 1.5;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
`;

const Form = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text_secondary};
`;

const Input = styled.input`
  width: calc(100% - 1.6rem); /* Matches the button padding for consistent length */
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.text_secondary + "90"};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.card_light};
  color: ${({ theme }) => theme.text_primary};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const ToggleText = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <LoginPageContainer theme={darkTheme}>
      <LoginBox theme={darkTheme}>
        {/* Left Section for Logo */}
        <LeftSection theme={darkTheme}>
          <BrandLogo src="brandLogo.gif" alt="Brand Logo" />
        </LeftSection>

        {/* Decorative Line */}
        <DecorativeLine theme={darkTheme} />

        {/* Right Section for Login/Sign Up */}
        <RightSection theme={darkTheme}>
          <Title>{isLogin ? "Welcome Back!" : "Create Your Account"}</Title>
          <Form>
            {!isLogin && (
              <FormGroup>
                <Label theme={darkTheme} htmlFor="username">
                  Username
                </Label>
                <Input
                  theme={darkTheme}
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                />
              </FormGroup>
            )}
            <FormGroup>
              <Label theme={darkTheme} htmlFor="email">
                Email
              </Label>
              <Input
                theme={darkTheme}
                type="email"
                id="email"
                placeholder="Enter your email"
              />
            </FormGroup>
            <FormGroup>
              <Label theme={darkTheme} htmlFor="password">
                Password
              </Label>
              <Input
                theme={darkTheme}
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </FormGroup>
            <Button theme={darkTheme} type="submit">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Form>
          <ToggleText theme={darkTheme} onClick={toggleForm}>
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </ToggleText>
        </RightSection>
      </LoginBox>
    </LoginPageContainer>
  );
};

export default LoginPage;