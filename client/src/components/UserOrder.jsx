import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataGrid } from "@material-ui/data-grid";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";

const Container = styled.div`
  padding: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 25px;
`;

const UserOrder = () => {
  const user = useSelector((state) => state.currentUser);
  const [buyOrders, setBuyOrders] = useState([]);
  const [sellOrders, setSellOrders] = useState([]);

  useEffect(() => {
    const getBuyOrders = async () => {
      try {
        const res = await userRequest.get(
          `/orders/findUserBuyOrders/${user._id}`
        );
        setBuyOrders(res.data);
      } catch (err) {}
    };
    getBuyOrders();
  }, [user]);

  useEffect(() => {
    const getSellOrders = async () => {
      try {
        const res = await userRequest.get(
          `/orders/findUserSellOrders/${user._id}`
        );
        setSellOrders(res.data);
      } catch (err) {}
    };
    getSellOrders();
  }, [user]);

  const columns = [
    { field: "productId", headerName: "Product ID", width: 250 },
    { field: "productName", headerName: "Product", width: 450 },
    { field: "size", headerName: "Size", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
  ];

  return (
    <Container>
      <TitleContainer>
        <Title>Buying Order List</Title>
      </TitleContainer>
      <DataGrid
        autoHeight={true}
        rows={buyOrders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
        components={{
          NoRowsOverlay: () => {
            return (
              <Stack
                height="100%"
                alignItems="center"
                justifyContent="center"
                marginTop={10}
              >
                No Buy Record
              </Stack>
            );
          },
        }}
      />
      <TitleContainer>
        <Title>Selling Order List</Title>
      </TitleContainer>
      <DataGrid
        autoHeight
        rows={sellOrders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
        components={{
          NoRowsOverlay: () => {
            return (
              <Stack
                height="100%"
                alignItems="center"
                justifyContent="center"
                marginTop={10}
              >
                No Sell Record
              </Stack>
            );
          },
        }}
      />
    </Container>
  );
};

export default UserOrder;
