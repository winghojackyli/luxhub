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
    if (sort === "latest") {
      setFilteredProducts((prev) =>
        [...prev].sort(
          (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
        )
      );
    } else if (sort === "oldest") {
      setFilteredProducts((prev) =>
        [...prev].sort(
          (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
        )
      );
    } else if (sort === "popularity") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.numSold - a.numSold)
      );
    }
  }, [sort, filteredProducts]);

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
