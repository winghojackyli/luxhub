import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "../components/Post";
import { publicRequest } from "../requestMethods";

const Container = styled.div``;

const Title = styled.h2`
  padding: 0px 30px;
  font-size: 30px;
  font-weight: 500;
`;

const PostContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Styles = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/posts");
        setPosts(res.data);
      } catch (err) {}
    };
    getProduct();
  }, []);
  return (
    <Container>
      <Title>Styles</Title>
      <PostContainer>
        {posts.map((post) => (
          <Post img={post.img} products={post.products} />
        ))}
      </PostContainer>
    </Container>
  );
};

export default Styles;
