import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 10%;
  background-color: white;
  position: relative;
  outline: 2px solid #d8d8d8;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const ProductItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Link to={`/product/${item._id}`}>
        <Info />
      </Link>
    </Container>
  );
};

export default ProductItem;
