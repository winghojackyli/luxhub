import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { userRequest } from "../requestMethods";

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

const SuccessOrder = () => {
  const [orderId, setOrderId] = useState(null);
  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    const updateNumSold = async () => {
      await userRequest.put(`/products/${data.productId}/sold`);
    };
    data && updateNumSold();
    data && setOrderId(data._id);
  }, [data]);
  return (
    <Container>
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Your order cannot be placed. Please try again. `}
      <Link to="/">
        <Button>Go to Homepage</Button>
      </Link>
    </Container>
  );
};

export default SuccessOrder;
