import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import { mobile } from "../responsive";
import { publicRequest, userRequest } from "../requestMethods";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ConfirmModal from "../components/ConfirmModal";

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

const Sell = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const size = searchParams.get("size");
  const price = searchParams.get("price");
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [ask, setAsk] = useState("");
  const [lowestAsk, setLowestAsk] = useState("");
  const [highestBid, setHighestBid] = useState("");
  const [mode, setMode] = useState("ask");
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser);

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
  };

  useEffect(() => {
    const getLowestAsk = async () => {
      if (size) {
        try {
          const res = await publicRequest.get(
            "/asks/lowestAsk/" + id + "/" + size
          );
          res.data ? setLowestAsk(res.data) : setLowestAsk("");
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

  useEffect(() => {
    const getHighestBid = async () => {
      if (size) {
        try {
          const res = await publicRequest.get(
            "/bids/highestBid/" + id + "/" + size
          );
          setHighestBid(res.data);
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

  const handleClick = () => {
    const makeAskRequest = async () => {
      if (currentUser) {
        if (mode === "ask") {
          console.log("mode===ask");
          try {
            if (highestBid?.price && ask <= highestBid.price) {
              handleOpen();
            } else {
              const res = await userRequest.post("/asks", {
                productId: id,
                productName: product.title,
                size: product.categories === "accessories" ? "" : size,
                price: ask,
                userId: currentUser._id,
              });
              console.log(ask);
              navigate("/successAsk", { state: res.data });
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          try {
            const res = await userRequest.post("/orders", {
              productId: id,
              productName: product.title,
              size: product.categories === "accessories" ? "" : size,
              price,
              seller: currentUser._id,
              buyer: highestBid.userId,
            });
            await userRequest.delete("/bids/" + highestBid._id);
            navigate("/successOrder", { state: res.data });
          } catch (err) {}
        }
      } else {
        alert("Please Login to proceed");
        navigate("/login");
      }
    };
    makeAskRequest();
  };

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
              <Button onClick={() => onChangeMode("ask")}>PLACE ASK</Button>
              <Button
                onClick={() => onChangeMode("sell")}
                disabled={price === ""}
              >
                SELL NOW
              </Button>
            </ButtonContainer>

            {mode === "sell" ? (
              <>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>$ {price}</SummaryItemPrice>
                </SummaryItem>
                <CheckoutButton onClick={handleClick}>SELL NOW</CheckoutButton>
              </>
            ) : (
              <BidWrapper>
                {lowestAsk?.price ? (
                  <Limit>Enter ${lowestAsk?.price} or earn more!</Limit>
                ) : (
                  <Limit>Place the first ask here!</Limit>
                )}
                <BidInput
                  placeholder="Enter Ask"
                  type="number"
                  min="100"
                  onChange={(e) => setAsk(e.target.value)}
                />
                <Limit>A minimum bid value of $100 is required</Limit>
                <CheckoutButton onClick={handleClick} disabled={!ask}>
                  PLACE ASK
                </CheckoutButton>
                <ConfirmModal
                  open={open}
                  handleClose={handleClose}
                  bestPrice={price}
                  bestBidAsk={highestBid}
                  type={"Ask"}
                  productId={id}
                  size={size}
                  product={product}
                />
              </BidWrapper>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Sell;
