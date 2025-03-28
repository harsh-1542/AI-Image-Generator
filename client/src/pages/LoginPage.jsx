import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { darkTheme } from "../utils/Theme";
import { AuthLogin, AuthRegister } from "../api";

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  width: calc(100% - 1.6rem);
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
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Redirect logged-in users
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  // Toggle between Login and Sign Up
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage(""); // Clear errors when switching
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {
        response = await AuthLogin(formData);
      } else {
        response = await AuthRegister(formData);
      }

      if (response.status >= 200 && response.status < 300) {
        if (response.data?.token) {
          localStorage.setItem("token", response.data.token);
          navigate("/"); // Redirect on success
        } else {
          setErrorMessage("No token received. Please try again.");
        }
      } else {
        setErrorMessage(response.data.message || "Something went wrong at login page backend");
      }
    } catch (error) {
      console.log(error);
      
      setErrorMessage(error.response?.data?.message || "An error occurred");
    }
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
          {errorMessage && <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>}
          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <FormGroup>
                <Label theme={darkTheme} htmlFor="username">
                  Username
                </Label>
                <Input
                  theme={darkTheme}
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
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
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
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
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </FormGroup>
            <Button theme={darkTheme} type="submit">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Form>
          <ToggleText theme={darkTheme} onClick={toggleForm}>
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </ToggleText>
        </RightSection>
      </LoginBox>
    </LoginPageContainer>
  );
};

export default LoginPage;
