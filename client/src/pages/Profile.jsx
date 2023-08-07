import React, { useState } from "react";
import styled from "styled-components";
import { Tabs, Tab, Box } from "@mui/material";

import UserOrder from "../components/UserOrder";
import UserBid from "../components/UserBid";
import UserAsk from "../components/UserAsk";
import UserInfo from "../components/UserInfo";

/** @type {import("@mui/material").SxProps} */
const styles = {
  Container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  TabsWrapper: {
    "& button": {
      fontSize: "1.1rem",
      mr: 10,
    },
    "& button.Mui-selected": {
      color: "black",
    },
  },
};

const Profile = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={styles.Container}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={styles.TabsWrapper}
          TabIndicatorProps={{ sx: { backgroundColor: "black" } }}
          centered
        >
          <Tab label="Profile" id="tab-0" />
          <Tab label="Bids" id="tab-1" />
          <Tab label="Asks" id="tab-2" />
          <Tab label="Orders" id="tab-3" />
        </Tabs>
      </Box>
      <Box sx={{ hidden: value !== 0 }}>{value === 0 && <UserInfo />}</Box>
      <Box sx={{ hidden: value !== 1 }}>{value === 1 && <UserBid />}</Box>
      <Box sx={{ hidden: value !== 2 }}>{value === 2 && <UserAsk />}</Box>
      <Box sx={{ hidden: value !== 3 }}>{value === 3 && <UserOrder />}</Box>
    </Box>
  );
};
export default Profile;

/*












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



*/
