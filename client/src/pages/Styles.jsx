import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "../components/Post";
import { publicRequest, userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await publicRequest.get("/posts");
        setPosts(res.data);
      } catch (err) {}
    };
    getPost();
  }, []);

  const updateProducts = (data) => {
    setPosts(data);
  };

  return (
    <Container>
      <Title>Styles</Title>
      <PostAddButton show={admin} onClick={() => navigate("/newPost")}>
        Create
      </PostAddButton>
      <PostContainer>
        {posts.map((post) => (
          <Post
            img={post.img}
            products={post.products}
            id={post._id}
            key={post._id}
            update={updateProducts}
          />
        ))}
      </PostContainer>
    </Container>
  );
};

export default Styles;
