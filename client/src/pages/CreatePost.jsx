import React, { useState } from "react";
import styled from "styled-components";
import GenerateImage from "../components/form/GenerateImage";
import GeneratedImageCard from "../components/cards/GeneratedImageCard";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 50px;
  height: 100%;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
  background: ${({ theme }) => theme.background};
`;

const Wrapper = styled.div`
  display: flex;
  gap: 8%;
  flex: 1;
  max-width: 1200px;
  height: fit-content;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
// const ErrorMessage = styled.p`
//   color: red;
//   font-size: 14px;
//   font-weight: bold;
//   text-align: center;
//   margin-bottom: 10px;
// `;

const CreatePost = () => {
  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [createPostLoading, setcreatePostLoading] = useState(false);
  const [error, setError] = useState("");
  const [post, setPost] = useState({
    prompt: "",
    photo: "",
  });
  return (
    <Container>
      <Wrapper>
         {/* ✅ Show error above GenerateImage */}
         {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
        <GenerateImage
            createPostLoading={createPostLoading}
            setcreatePostLoading={setcreatePostLoading}
            generateImageLoading={generateImageLoading}
            setGenerateImageLoading={setGenerateImageLoading}
            post={post}
            error={error}
            setPost={setPost}
            setError={setError}
          />
        <GeneratedImageCard loading={generateImageLoading} src={post.photo} error={error}  />
      </Wrapper>
    </Container>
  );
};

export default CreatePost;
