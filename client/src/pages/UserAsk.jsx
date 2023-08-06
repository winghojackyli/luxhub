import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { publicRequest, userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserAsk = () => {
  const user = useSelector((state) => state.currentUser);

  return <>UserAsk</>;
};

export default UserAsk;
