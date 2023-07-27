import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userRequest } from "../requestMethods";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
`;

const Success = () => {
  const [bidId, setBidId] = useState(null);
  const location = useLocation();
  const stripeData = location.state.stripeData;
  const productId = location.state.productId;
  const size = location.state.size;
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const createBid = async () => {
      try {
        const res = await userRequest.post("/bids", {
          userId: currentUser._id,
          productId,
          size,
          price: stripeData.amount,
          address: stripeData.billing_details.address,
        });
        setBidId(res.data._id);
      } catch (err) {}
    };
    stripeData && createBid();
  }, [stripeData, currentUser, dispatch, productId, size]);
  return (
    <Container>
      {bidId
        ? `Bid has been created successfully. Your bid number is ${bidId}`
        : `Your bid cannot be placed. Please try again. `}
      <Link to="/">
        <Button>Go to Homepage</Button>
      </Link>
    </Container>
  );
};

export default Success;
