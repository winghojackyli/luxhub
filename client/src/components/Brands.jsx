import React from "react";
import styled from "styled-components";
import { brands } from "../data";
import BrandItem from "./BrandItem";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Brands = () => {
  return (
    <Container>
      {brands.map((item) => (
        <BrandItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Brands;
