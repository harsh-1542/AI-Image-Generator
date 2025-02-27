import React from "react";
import styled from "styled-components";

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

const UserLabel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const UserInfo = ({ name }) => {
  return (
    <UserInfoContainer>
      <UserLabel>Author:</UserLabel>
      <UserName>{name || "Loading..."}</UserName>
    </UserInfoContainer>
  );
};

export default UserInfo;
