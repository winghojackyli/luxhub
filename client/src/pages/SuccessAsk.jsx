import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

const SuccessAsk = () => {
  const [askId, setAskId] = useState(null);
  const location = useLocation();
  const askData = location.state;
  useEffect(() => {
    setAskId(askData._id);
  }, [askData]);
  return (
    <Container>
      {askId
        ? `Ask has been created successfully. Your ask number is ${askId}`
        : `Your ask cannot be placed. Please try again. `}
      <Link to="/">
        <Button>Go to Homepage</Button>
      </Link>
    </Container>
  );
};

export default SuccessAsk;
