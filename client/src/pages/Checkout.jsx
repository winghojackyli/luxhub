import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { publicRequest, userRequest } from "../requestMethods";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 50%;
  padding: 10px;
  margin: 0px 5px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
const CheckoutButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const BidWrapper = styled.div`
  margin: 30px 0px;
  display: flex;
  flex-direction: column;
`;
const BidInput = styled.input`
  width: 95%;
  font-size: 20px;
  padding: 10px;
`;
const Limit = styled.div`
  font-size: 15px;
  font-weight: 200;
  margin: 10px;
`;

const Checkout = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const size = searchParams.get("size");
  const id = location.pathname.split("/")[2];
  const checkout = useSelector((state) => state.checkout);
  const [stripeToken, setStripeToken] = useState(null);
  const [product, setProduct] = useState({});
  const [mode, setMode] = useState("buy");
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

  const onChangeMode = (mode) => {
    setMode(mode);
  };

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
        });
        navigate("/success", {
          state: { stripeData: res.data, checkout },
        });
      } catch (err) {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate, checkout]);

  return (
    <Container>
      <Announcement />
      <Wrapper>
        <Bottom>
          <Info>
            <Product>
              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product._id}
                  </ProductId>
                  <ProductSize>
                    <b>Size:</b> {size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductPrice>$ price</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER</SummaryTitle>
            <ButtonContainer>
              <Button onClick={() => onChangeMode("bid")}>PLACE BID</Button>
              <Button onClick={() => onChangeMode("buy")}>BUY NOW</Button>
            </ButtonContainer>

            {mode === "buy" ? (
              <>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>$ total</SummaryItemPrice>
                </SummaryItem>
                <StripeCheckout
                  name="LuxHub"
                  image="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                  billingAddress
                  shippingAddress
                  description={`Tour total is $total`}
                  amount={100 * 100}
                  token={onToken}
                  stripeKey={KEY}
                  locale="en"
                >
                  <CheckoutButton>CHECKOUT NOW</CheckoutButton>
                </StripeCheckout>
              </>
            ) : (
              <BidWrapper>
                <BidInput placeholder="Enter Bid" type="number" min="100" />
                <Limit>A minimum bid value of $100 is required</Limit>
                <StripeCheckout
                  name="LuxHub"
                  image="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                  billingAddress
                  shippingAddress
                  description={`Tour total is $total`}
                  amount={100 * 100}
                  token={onToken}
                  stripeKey={KEY}
                  locale="en"
                >
                  <CheckoutButton>PLACE BID</CheckoutButton>
                </StripeCheckout>
              </BidWrapper>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Checkout;
