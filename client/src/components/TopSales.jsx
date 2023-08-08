import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import { publicRequest } from "../requestMethods";

const Container = styled.div``;

const ProductContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Title = styled.h2`
  padding: 0px 30px;
  font-size: 30px;
  font-weight: 500;
`;

const TopSales = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products/bestSellers");
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, []);

  return (
    <Container>
      <Title>Best Sellers</Title>
      <ProductContainer>
        {products.slice(0, 5).map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </ProductContainer>
    </Container>
  );
};

export default TopSales;
