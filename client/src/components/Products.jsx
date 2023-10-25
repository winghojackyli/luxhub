import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
        if (qSearch) {
          const res = await publicRequest.get(
            "/products/find?search=" + qSearch
          );
          setProducts(res.data);
        } else {
          const res = await publicRequest.get("/products");
          setProducts(res.data);
        }
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
      setFilteredProducts((prev) =>
        [...prev].sort(
          (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
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
