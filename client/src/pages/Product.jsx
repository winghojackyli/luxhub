import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import { mobile } from "../responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 35px;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 30px;
  font-weight: 200;
`;

const FilterSize = styled.select`
  font-size: 20px;
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const Button = styled.button`
  width: 30%;
  margin: 10px;
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [size, setSize] = useState("");
  const [bid, setBid] = useState("");
  const [ask, setAsk] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (err) {}
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    const getBid = async () => {
      if (size) {
        try {
          const res = await publicRequest.get(
            "/bids/highestbid/" + id + "/" + size
          );
          res.data ? setBid(res.data.price) : setBid(" - ");
        } catch (err) {}
      }
    };
    getBid();
  }, [id, size]);

  useEffect(() => {
    const getAsk = async () => {
      if (size) {
        try {
          const res = await publicRequest.get(
            "/asks/lowestask/" + id + "/" + size
          );
          res.data ? setAsk(res.data.price) : setAsk(" - ");
        } catch (err) {}
      }
    };
    getAsk();
  }, [id, size]);

  const handleClick = (action) => {
    if (action === "buy") {
      navigate(`/checkout/${id}?size=${size}&price=${ask}`);
    } else {
      navigate(`/sell/${id}?size=${size}&price=${bid}`);
    }
  };

  return (
    <Container>
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Description>{product.desc}</Description>
          <PriceContainer>
            {bid ? (
              <>
                <Price>{"Highest Bid: $ " + bid}</Price>
                <Button onClick={() => handleClick("sell")} disabled={!size}>
                  ASK or SELL FOR ${bid}
                </Button>
              </>
            ) : (
              <Price>Select a size</Price>
            )}
          </PriceContainer>
          {size && (
            <PriceContainer>
              {ask ? (
                <>
                  <Price>{"Lowest Ask: $ " + ask}</Price>
                  <Button onClick={() => handleClick("buy")} disabled={!size}>
                    BID or BUY FOR ${ask}
                  </Button>
                </>
              ) : (
                <Price></Price>
              )}
            </PriceContainer>
          )}
          <FilterContainer>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                <FilterSizeOption disabled selected></FilterSizeOption>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
