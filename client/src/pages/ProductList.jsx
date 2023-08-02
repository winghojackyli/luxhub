import React, { useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div``;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const ProductAddButton = styled.button`
  width: 100px;
  border: none;
  padding: 10px;
  margin-right: 30px;
  margin-left: auto;
  background-color: #00004f;
  color: white;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const admin = useSelector((state) => state.currentUser?.isAdmin);
  const location = useLocation();
  const branding = location.pathname.split("/")[2];
  const [filters, setFilters] = useState(branding ? { brand: branding } : {});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    if (e.target.value !== "all") {
      const value = e.target.value;
      setFilters({
        ...filters,
        [e.target.name]: value,
      });
    } else {
      if (e.target.name === "brand") {
        const { brand, ...rest } = filters;
        setFilters(rest);
      } else {
        const { categories, ...rest } = filters;
        setFilters(rest);
      }
    }
  };

  return (
    <Container>
      <Announcement />
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="categories" onChange={handleFilters}>
            <Option disabled>Category</Option>
            <Option selected>all</Option>
            <Option>top</Option>
            <Option>bottom</Option>
            <Option>shoes</Option>
            <Option>accessories</Option>
          </Select>
          <Select name="brand" onChange={handleFilters} value={branding}>
            <Option disabled>Brand</Option>
            <Option selected>all</Option>
            <Option>adidas</Option>
            <Option>yeezy</Option>
            <Option>nike</Option>
            <Option>jordan</Option>
            <Option>new balance</Option>
            <Option>wtaps</Option>
            <Option>asics</Option>
            <Option>jjjjound</Option>
            <Option>sacai</Option>
            <Option>palm angels</Option>
            <Option>gap</Option>
            <Option>supreme</Option>
            <Option>human made</Option>
            <Option>kaws</Option>
            <Option>moncler</Option>
            <Option>fragment</Option>
            <Option>stussy</Option>
            <Option>levis</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="hightolow">Price: Hight-Low</Option>
            <Option value="lowtohigh">Price: Low-High</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Link
        to="/newProduct"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <ProductAddButton show={admin}>Create</ProductAddButton>
      </Link>
      <Products filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
