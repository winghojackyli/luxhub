import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin: 10px;
  min-width: 300px;
  height: 550px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  flex-basis: 10%;
`;

const Image = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 10px;
`;

const Details = styled.ul`
  margin: 0px 5px;
  padding: 0;
`;

const ProdTitle = styled.li`
  list-style-type: circle;
  font-size: 16px;
  font-weight: 300;
  display: inline-block;
  margin-top: 5px;
  &:hover {
    color: #707070;
  }
`;

const Post = ({ img, products }) => {
  return (
    <Container>
      <Image src={img} />
      <Details>
        {products.map((product) => (
          <Link
            to={`/product/${product.productId}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <ProdTitle>{product.productName}</ProdTitle>
          </Link>
        ))}
      </Details>
    </Container>
  );
};

export default Post;
