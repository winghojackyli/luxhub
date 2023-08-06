import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { userRequest } from '../requestMethods';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

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

const ListItem = styled.div`
  display: flex;
  align-items: center;
`;

const ListImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const ListEditButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #00224f;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

const UserBid = () => {
  const user = useSelector((state) => state.currentUser);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const getBids = async () => {
      try {
        const res = await userRequest.get(`/bids/findUserBids/${user._id}`);
        setBids(res.data);
      } catch (err) {}
    };
    getBids();
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    const deleteBids = async () => {
      try {
        await userRequest.delete(`/bids`); //missing bid id
      } catch (err) {}
    };
    deleteBids();
  };

  const columns = [
    { field: 'productId', headerName: 'Product ID', width: 220 },
    { field: 'productName', headerName: 'Product', width: 400 },
    { field: 'size', headerName: 'Size', width: 200 },
    {
      field: 'price',
      headerName: 'Bid Price',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/product/' + params.row._id}>
              <ListEditButton>Edit</ListEditButton>
            </Link>
            <DeleteOutline
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={() => handleDelete(params.row._id)}
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
        rows={bids}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
      />
    </Container>
  );
};

export default UserBid;
