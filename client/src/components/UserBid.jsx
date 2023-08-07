import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataGrid } from "@material-ui/data-grid";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const Container = styled.div`
  padding: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 25px;
`;

const ListEditButton = styled.button`
  width: 60px;
  border: none;
  border-radius: 10px;
  padding: 8px 10px;
  background-color: ${(props) =>
    props.mode === "edit" ? "#00224f" : "#860000"};
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

const UserBid = () => {
  const user = useSelector((state) => state.currentUser);
  const [bids, setBids] = useState([]);

  // Modal related (Delete Modal)
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // Modal related (Edit Modal)
  const [editModal, setEditModal] = useState(false);
  const openEdit = () => {
    setEditModal(true);
  };
  const closeEdit = () => {
    setEditModal(false);
  };

  useEffect(() => {
    const getBids = async () => {
      try {
        const res = await userRequest.get(`/bids/findUserBids/${user._id}`);
        setBids(res.data);
      } catch (err) {}
    };
    getBids();
  }, [user]);

  const columns = [
    { field: "productId", headerName: "Product ID", width: 250 },
    { field: "productName", headerName: "Product", width: 450 },
    { field: "size", headerName: "Size", width: 200 },
    {
      field: "price",
      headerName: "Bid Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <ListEditButton mode={"edit"} onClick={openEdit}>
              Edit
            </ListEditButton>

            <ListEditButton mode={"delete"} onClick={handleOpen}>
              Delete
            </ListEditButton>
            <DeleteModal
              open={open}
              handleClose={handleClose}
              itemId={params.row._id}
              type="Bid"
              reRender={setBids}
            />
            <EditModal
              open={editModal}
              handleClose={closeEdit}
              itemId={params.row._id}
              type="Ask"
              reRender={setBids}
            />
          </>
        );
      },
    },
  ];

  return (
    <Container>
      <TitleContainer>
        <Title>Bid List</Title>
      </TitleContainer>
      <DataGrid
        autoHeight={true}
        rows={bids}
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
                No Bid Record
              </Stack>
            );
          },
        }}
      />
    </Container>
  );
};

export default UserBid;
