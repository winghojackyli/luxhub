import { Send } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  height: 30vh;
  background-color: #cbd6d6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 20px;
`;
const Description = styled.div`
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgrey;
  ${mobile({ width: "80%" })}
`;
const Input = styled.input`
  border: none;
  font-size: 16px;
  flex: 8;
  padding-left: 20px;
`;
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: grey;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Message = styled.div`
  font-size: 15px;
  font-weight: 400;
  text-align: center;
  margin-top: 15px;
`;

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const makeRequest = async () => {
      try {
        const res = await publicRequest.post("/emails", { email });
        setMessage(res.status);
      } catch (err) {
        setMessage(err.response.status);
      }
    };
    makeRequest();
  };

  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favorite products.</Description>
      <InputContainer>
        <Input
          type="email"
          placeholder="Your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleSend}>
          <Send />
        </Button>
      </InputContainer>
      {message && (
        <Message>
          {message === 200
            ? "Thank you for your subscription!"
            : "Please enter a valid email"}
        </Message>
      )}
    </Container>
  );
};

export default Newsletter;
