import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import ProductItem from "./ProductItem";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SearchResult = styled.h4`
  padding-left: 20px;
  font-size: 20px;
  font-weight: 300;
`;

const Products = ({ filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const qSearch = useSearchParams()[0].get("search");

  useEffect(() => {
    const getProducts = async () => {
      try {
        let res;
        if (qSearch) {
          res = await axios.get(
            "http://localhost:5000/api/products/find?search=" + qSearch
          );
        } else {
          res = await axios.get("http://localhost:5000/api/products");
        }
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [qSearch]);

  useEffect(() => {
    if (filters) {
      setFilteredProducts(
        products?.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    }
  }, [products, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      );
    } else if (sort === "hightolow") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    } else if (sort === "lowtohigh") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    }
  }, [sort]);

  return (
    <>
      {qSearch && (
        <SearchResult>
          {products.length || "No"} results found for "{qSearch}"
        </SearchResult>
      )}
      <Container>
        {filteredProducts.map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </Container>
    </>
  );
};

export default Products;
