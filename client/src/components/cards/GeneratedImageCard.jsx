import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  padding: 16px;
  border: 2px dashed ${({ theme }) => theme.yellow + 90};
  color: ${({ theme }) => theme.arrow + 80};
  border-radius: 20px;
  display: flex;
  flex-direction: column; /* ✅ Ensure text & image align properly */
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
  min-height: 250px;
  max-width: 100%; /* ✅ Ensures responsiveness */
`;

const Image = styled.img`
  max-width: 100%; /* ✅ Prevents overflow */
  max-height: 100%; /* ✅ Ensures it fits properly */
  border-radius: 18px;
  object-fit: cover;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  background: rgba(255, 0, 0, 0.1);
  border-radius: 8px;
`;

const GeneratedImageCard = ({ src, loading, error }) => {
// console.log(error);

  
  return (
    <Container>
      {loading ? (
        <>
          <CircularProgress sx={{ color: "inherit", width: "24px", height: "24px" }} />
          <p>Generating Your Image . . .</p>
        </>
      ) : error ? (
        <ErrorMessage>❌ {error}</ErrorMessage> // ✅ Better UI for errors
      ) : src ? (
        <Image src={src} alt="Generated AI Image" />
      ) : (
        <p>Write a prompt to generate an image</p>
      )}
    </Container>
  );
};

export default GeneratedImageCard;
