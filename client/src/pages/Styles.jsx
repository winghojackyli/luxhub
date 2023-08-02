import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "../components/Post";
import { publicRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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

const PostAddButton = styled.button`
  width: 100px;
  border: none;
  padding: 10px;
  margin-right: 60px;
  margin-left: auto;
  background-color: #00004f;
  color: white;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const Styles = () => {
  const admin = useSelector((state) => state.currentUser?.isAdmin);
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
      <Link to="/newPost" style={{ color: "inherit", textDecoration: "none" }}>
        <PostAddButton show={admin}>Create</PostAddButton>
      </Link>
      <PostContainer>
        {posts.map((post) => (
          <Post img={post.img} products={post.products} />
        ))}
      </PostContainer>
    </Container>
  );
};

export default Styles;
