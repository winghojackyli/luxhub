import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import { Stack } from "@mui/material";
import { publicRequest } from "../requestMethods";

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
          res = await publicRequest.get(`/asks/find/${id}`);
        } else if (type === "Bid") {
          res = await publicRequest.get(`/bids/find/${id}`);
        }
        setTableData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAskBid();
  }, [id, type]);

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
    size: `${item._id.size || "-"}`,
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
