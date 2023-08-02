import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Stack } from "@mui/material";

const Container = styled.div`
  height: 700px;
  width: 100%;
  padding: 50px;
`;

const AskBidData = ({ type }) => {
  const [tableData, setTableData] = useState([]);
  // type: Ask, Bid
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const getAskBid = async () => {
      try {
        let res;
        if (type === "Ask") {
          res = await axios.get(`http://localhost:5000/api/asks/find/${id}`);
        } else if (type === "Bid") {
          res = await axios.get(`http://localhost:5000/api/bids/find/${id}`);
        }
        console.log(res.data);
        setTableData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAskBid();
  }, []);

  const columns = [
    {
      field: "quantity",
      headerName: "Quantity",
      width: 133,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "size",
      headerName: "Size",
      width: 133,
      align: "center",
      headerAlign: "center",
    },
    {
      field: `price`,
      headerName: `${type} Price`,
      width: 133,
      align: "center",
      headerAlign: "center",
    },
  ];

  const rows = tableData.map((item) => ({
    price: `$${item._id.price}`,
    size: `US ${item._id.size}`,
    quantity: item.quantity,
  }));

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.size + row.price}
        slots={{
          noRowsOverlay: () => {
            return (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No Active {type === "Ask" ? "Ask" : "Bid"}
              </Stack>
            );
          },
        }}
      />
    </div>
  );
};

export default AskBidData;
