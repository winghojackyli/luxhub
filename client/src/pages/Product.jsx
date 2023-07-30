import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import { mobile } from "../responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRequest, userRequest } from "../requestMethods";
import Chart from "../components/Chart";

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

const DetailsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Details = styled.h4`
  font-weight: 150;
  font-size: 25px;
  margin: 10px 0px;
  padding-right: 100px;
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

const ChartContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [size, setSize] = useState("");
  const [bid, setBid] = useState("");
  const [ask, setAsk] = useState("");
  const [latestSalesPrice, setLatestSalesPrice] = useState("");
  const navigate = useNavigate();
  const [productStats, setProductStats] = useState([]);
  const [priceStats, setPriceStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getStats = async () => {
      try {
        const resSales = await userRequest.get(`/orders/${id}/sales`);
        resSales.data.map((item) =>
          setProductStats((prev) => [
            ...prev,
            {
              xaxis: MONTHS[item._id - 1],
              yaxis: item.total,
              Sales: item.total,
            },
          ])
        );

        const resTrend = await userRequest.get(`/orders/${id}/trend`);
        resTrend.data.map((item) =>
          setPriceStats((prev) => [
            ...prev,
            {
              xaxis: `${MONTHS[item.month - 1]} ${item.day}`,
              yaxis: item.price,
              Price: item.price,
            },
          ])
        );
      } catch (err) {}
    };
    getStats();
  }, [MONTHS, id]);

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
          res.data ? setBid(res.data.price) : setBid("");
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
          res.data ? setAsk(res.data.price) : setAsk("");
        } catch (err) {}
      }
    };
    getAsk();
  }, [id, size]);

  useEffect(() => {
    const getLatestSalesPrice = async () => {
      try {
        const res = await publicRequest.get(`/orders/${id}/latest`);
        console.log(res.data[0]);
        res.data && setLatestSalesPrice(res.data[0].price);
      } catch (err) {}
    };
    getLatestSalesPrice();
  }, [id]);

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
          <Details>
            Release Date: {new Date(product.releaseDate).toLocaleDateString()}
          </Details>
          <DetailsWrapper>
            <Details>Number Sold: {product.numSold}</Details>
            {latestSalesPrice && (
              <Details>Last Sale: $ {latestSalesPrice}</Details>
            )}
          </DetailsWrapper>
          {size ? (
            <>
              <PriceContainer>
                {bid ? (
                  <Price>{"Highest Bid: $ " + bid}</Price>
                ) : (
                  <Price>No Bid</Price>
                )}
                <Button onClick={() => handleClick("sell")} disabled={!size}>
                  {bid ? `ASK or SELL FOR ${bid}` : `ASK`}
                </Button>
              </PriceContainer>
              <PriceContainer>
                {ask ? (
                  <Price>{"Lowest Ask: $ " + ask}</Price>
                ) : (
                  <Price>No Ask</Price>
                )}
                <Button onClick={() => handleClick("buy")} disabled={!size}>
                  {ask ? `BID or BUY FOR ${ask}` : `BID`}
                </Button>
              </PriceContainer>
            </>
          ) : (
            <PriceContainer>
              <Price>Select a size</Price>
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
          <Button>View All Bids</Button>
          <Button>View All Asks</Button>
        </InfoContainer>
      </Wrapper>
      <ChartContainer>
        <Chart data={productStats} title="Product Sales" grid dataKey="Sales" />
        <Chart data={priceStats} title="Price Trend" grid dataKey="Price" />
      </ChartContainer>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
