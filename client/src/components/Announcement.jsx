import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #b5b5b5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container>Get Your Dream Collection Here</Container>;
};

export default Announcement;
