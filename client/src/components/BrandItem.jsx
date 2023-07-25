import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 30vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 12px;
  background-color: white;
  color: grey;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #e6e6e6;
  }
`;

const BrandItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Link to={`/products/${item.brand}`}>
          <Button>{item.title}</Button>
        </Link>
      </Info>
    </Container>
  );
};

export default BrandItem;
