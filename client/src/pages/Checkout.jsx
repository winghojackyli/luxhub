import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { publicRequest, userRequest } from "../requestMethods";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ConfirmModal from "../components/ConfirmModal";

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
  &:disabled {
    opacity: 0.5;
  }
`;
const CheckoutButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
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
  margin: 5px;
`;

const Checkout = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const size = searchParams.get("size");
  const price = searchParams.get("price");
  const id = location.pathname.split("/")[2];
  const [stripeToken, setStripeToken] = useState(null);
  const [product, setProduct] = useState({});
  const [bid, setBid] = useState("");
  const [lowestAsk, setLowestAsk] = useState("");
  const [highestBid, setHighestBid] = useState("");
  const [mode, setMode] = useState("bid");
  const currentUser = useSelector((state) => state.currentUser);
  const navigate = useNavigate();

  // Modal related
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
    if (mode === "buy") setBid(price);
    else setBid("");
  };

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        if (lowestAsk?.price && bid >= lowestAsk.price) {
          const res = await userRequest.post("/orders", {
            productId: id,
            productName: product.title,
            size: product.categories === "accessories" ? "" : size,
            price: lowestAsk.price,
            seller: lowestAsk.userId,
            buyer: currentUser._id,
          });
          await userRequest.delete("/asks/" + lowestAsk._id);
          await userRequest.post("/checkout/payment", {
            tokenId: stripeToken.id,
            amount: lowestAsk.price,
          });
          navigate("/successOrder", { state: res.data });
        } else {
          const res = await userRequest.post("/checkout/payment", {
            tokenId: stripeToken.id,
            amount: mode === "buy" ? price : bid,
          });
          navigate("/success", {
            state: { stripeData: res.data, productId: id, size, lowestAsk },
          });
        }
      } catch (err) {}
    };
    stripeToken && makeRequest();
  }, [
    stripeToken,
    navigate,
    price,
    id,
    size,
    bid,
    mode,
    lowestAsk,
    currentUser,
    product,
  ]);

  useEffect(() => {
    const getHighestBid = async () => {
      if (size) {
        try {
          const res = await publicRequest.get(
            "/bids/highestBid/" + id + "/" + size
          );
          res.data ? setHighestBid(res.data) : setHighestBid("");
        } catch (err) {}
      } else if (product.categories === "accessories") {
        try {
          const res = await publicRequest.get("/bids/highestBid/" + id);
          res.data ? setHighestBid(res.data) : setHighestBid("");
        } catch (err) {}
      }
    };
    getHighestBid();
  }, [id, size, product]);

  useEffect(() => {
    const getLowestAsk = async () => {
      if (size) {
        try {
          const res = await publicRequest.get(
            "/asks/lowestAsk/" + id + "/" + size
          );
          setLowestAsk(res.data);
        } catch (err) {}
      } else if (product.categories === "accessories") {
        try {
          const res = await publicRequest.get("/asks/lowestAsk/" + id);
          res.data ? setLowestAsk(res.data) : setLowestAsk("");
        } catch (err) {}
      }
    };
    getLowestAsk();
  }, [id, size, product]);

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
                  {product.size?.length !== 0 && (
                    <ProductSize>
                      <b>Size:</b> {size}
                    </ProductSize>
                  )}
                </Details>
              </ProductDetail>
            </Product>
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER</SummaryTitle>
            <ButtonContainer>
              <Button onClick={() => onChangeMode("bid")}>PLACE BID</Button>
              <Button
                onClick={() => onChangeMode("buy")}
                disabled={price === ""}
              >
                BUY NOW
              </Button>
            </ButtonContainer>

            {/* {currentUser ? ( */}
            {mode === "buy" ? (
              <>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>$ {price}</SummaryItemPrice>
                </SummaryItem>

                {currentUser ? (
                  <StripeCheckout
                    name="LuxHub"
                    image="https://i.ibb.co/rpPZJH6/logo.png"
                    billingAddress
                    shippingAddress
                    description={`Your total is ${price}`}
                    amount={price * 100}
                    token={onToken}
                    stripeKey={KEY}
                    locale="en"
                  >
                    <CheckoutButton>CHECKOUT NOW</CheckoutButton>
                  </StripeCheckout>
                ) : (
                  <CheckoutButton
                    disabled={!bid}
                    onClick={() => {
                      alert("Please Login to proceed");
                      navigate("/login");
                    }}
                  >
                    PLACE BID
                  </CheckoutButton>
                )}
              </>
            ) : (
              <BidWrapper>
                {highestBid?.price ? (
                  <Limit>
                    Enter ${highestBid?.price} or more to get your Bid matched
                    faster!
                  </Limit>
                ) : (
                  <Limit>Place the first bid now!</Limit>
                )}
                <BidInput
                  placeholder="Enter Bid"
                  type="number"
                  min="100"
                  onChange={(e) => setBid(e.target.value)}
                />
                <Limit>A minimum bid value of $100 is required</Limit>

                {lowestAsk?.price && bid >= lowestAsk.price ? (
                  <>
                    {currentUser ? (
                      <CheckoutButton disabled={!bid} onClick={handleOpen}>
                        PLACE BID
                      </CheckoutButton>
                    ) : (
                      <CheckoutButton
                        disabled={!bid}
                        onClick={() => {
                          alert("Please Login to proceed");
                          navigate("/login");
                        }}
                      >
                        PLACE BID
                      </CheckoutButton>
                    )}
                    <ConfirmModal
                      open={open}
                      handleClose={handleClose}
                      bestPrice={price}
                      bestBidAsk={lowestAsk}
                      type={"Bid"}
                      productId={id}
                      size={size}
                      product={product}
                    />
                  </>
                ) : currentUser ? (
                  <StripeCheckout
                    name="LuxHub"
                    image="https://i.ibb.co/rpPZJH6/logo.png"
                    billingAddress
                    shippingAddress
                    description={`Tour total is ${bid}`}
                    amount={bid * 100}
                    token={onToken}
                    stripeKey={KEY}
                    locale="en"
                  >
                    <CheckoutButton disabled={!bid}>PLACE BID</CheckoutButton>
                  </StripeCheckout>
                ) : (
                  <CheckoutButton
                    disabled={!bid}
                    onClick={() => {
                      alert("Please Login to proceed");
                      navigate("/login");
                    }}
                  >
                    PLACE BID
                  </CheckoutButton>
                )}
              </BidWrapper>
            )}

            {/* // ) : (
            //   <CheckoutButton
            //     disabled={!bid}
            //     onClick={() => {
            //       alert("Please Login to proceed");
            //       navigate("/login");
            //     }}
            //   >
            //     PLACE BID
            //   </CheckoutButton>
            // )} */}
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Checkout;
