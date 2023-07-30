import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";

const Container = styled.div`
  height: 700px;
  width: 100%;
  padding: 50px;
`;

const AskBidData = ({ type }) => {
  // const [tableData, setTableData] = useState([]);

  const columns = [
    {
      field: "quantity",
      headerName: "Quantity",
    },
    {
      field: "size",
      headerName: "Size",
    },
    {
      field: `price`,
      headerName: `${type} Price`,
    },
  ];

  const tableData = [
    { quantity: 2, size: 8, price: 123 },
    { quantity: 2, size: 8, price: 124 },
    { quantity: 2, size: 8, price: 125 },
    { quantity: 2, size: 8, price: 126 },
    { quantity: 2, size: 8, price: 127 },
    { quantity: 2, size: 8, price: 128 },
    { quantity: 2, size: 8, price: 129 },
    { quantity: 2, size: 8, price: 130 },
    { quantity: 2, size: 8, price: 131 },
    { quantity: 2, size: 8, price: 132 },
    { quantity: 2, size: 8, price: 133 },
    { quantity: 2, size: 8, price: 128 },
    { quantity: 2, size: 8, price: 129 },
    { quantity: 2, size: 8, price: 130 },
    { quantity: 2, size: 8, price: 131 },
    { quantity: 2, size: 8, price: 132 },
    { quantity: 2, size: 8, price: 133 },
    { quantity: 2, size: 8, price: 128 },
    { quantity: 2, size: 8, price: 129 },
    { quantity: 2, size: 8, price: 130 },
    { quantity: 2, size: 8, price: 131 },
    { quantity: 2, size: 8, price: 132 },
    { quantity: 2, size: 8, price: 133 },
    { quantity: 2, size: 8, price: 128 },
    { quantity: 2, size: 8, price: 129 },
    { quantity: 2, size: 8, price: 130 },
    { quantity: 2, size: 8, price: 131 },
    { quantity: 2, size: 8, price: 132 },
    { quantity: 2, size: 8, price: 133 },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        getRowId={(row) => row.size + row.price}
      />
    </div>
  );
};

export default AskBidData;

/*

<Container>
      <DataGrid
        rows={tableData}
        getRowId={(row) => row.size + row.price}
        columns={columns}
        pageSize={12}
      />
    </Container>
*/
