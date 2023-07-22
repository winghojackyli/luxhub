import React from "react";
import styled from "styled-components";
import Post from "../components/Post";
import essentials1 from "../assets/essentials_1.jpg";
import Denim1 from "../assets/denim_1.jpg";
import gucci from "../assets/gucci.jpg";
import supreme from "../assets/supreme_1.jpg";

const Container = styled.div``;

const Title = styled.h1`
  margin: 50px 20px 10px 20px;
  text-align: center;
`;

const PostsDiv = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const News = () => {
  return (
    <Container>
      <Title>Get Inspired</Title>
      <PostsDiv>
        <Post photo={essentials1} />
        <Post photo={Denim1} />
        <Post photo={gucci} />
        <Post photo={essentials1} />
        <Post photo={supreme} />
      </PostsDiv>
    </Container>
  );
};

export default News;
