import React, { useState } from "react";
import styled from "styled-components";
import UserOrder from "../components/UserOrder";
import UserBid from "../components/UserBid";
import UserAsk from "../components/UserAsk";
import UserInfo from "../components/UserInfo";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Profile = () => {
  const [mode, setMode] = useState("profile");
  const handleMode = (mode) => {
    setMode(mode);
  };
  const renderComponent = () => {
    switch (mode) {
      case "profile":
        return <UserInfo />;
      case "orders":
        return <UserOrder />;
      case "bids":
        return <UserBid />;
      case "asks":
        return <UserAsk />;
      default:
        return <></>;
    }
  };

  return (
    <Container>
      <ButtonContainer>
        <button onClick={() => handleMode("profile")}>Profile</button>
        <button onClick={() => handleMode("bids")}>Bids</button>
        <button onClick={() => handleMode("asks")}>Asks</button>
        <button onClick={() => handleMode("orders")}>Orders</button>
      </ButtonContainer>
      {renderComponent()}
    </Container>
  );
};
export default Profile;
