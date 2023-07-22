import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 5px;
  min-width: 280px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  flex-basis: 20%;
`;

const Image = styled.img`
  height: 75%;
  width: 220px;
  border-radius: 10px;
`;

const Details = styled.div``;

const ProdTitle = styled.span`
  display: inline-block;
  margin-top: 5px;
`;

const Post = ({ photo }) => {
  return (
    <Container>
      <Image src={photo} />
      <Details>
        <ProdTitle>#Yeezy Slides</ProdTitle>
        <br />
        <ProdTitle>#Essential Hoodie</ProdTitle>
      </Details>
    </Container>
  );
};

export default Post;
