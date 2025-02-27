import React from 'react'

import styled from "styled-components";
import { darkTheme } from "../utils/Theme";




const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${({ theme }) => theme.text_primary};
  `;
  
//   background-color: ${({ theme }) => theme.bg};
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


const ProfilePage = () => {
  return (
    <LoginPageContainer theme={darkTheme}>
          <LoginBox theme={darkTheme}>
            
            ProfilePage

          </LoginBox>
          </LoginPageContainer>
  )
}

export default ProfilePage