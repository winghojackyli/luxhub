import React from "react";
import Button from "@mui/material/Button";
import { Typography, Modal, Box } from "@material-ui/core";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";

const DeleteModal = ({ itemId, open, handleClose, type, reRender }) => {
  const user = useSelector((state) => state.currentUser);

  const handleDelete = () => {
    const deleteAskBid = async () => {
      try {
        if (type === "Ask") {
          await userRequest.delete(`/asks/${itemId}`);
          const res = await userRequest.get(`/asks/findUserBids/${user._id}`);
          reRender(res.data);
        } else if (type === "Bid") {
          await userRequest.delete(`/bids/${itemId}`);
          const res = await userRequest.get(`/bids/findUserBids/${user._id}`);
          reRender(res.data);
        }
        handleClose();
      } catch (err) {
        console.log(err);
      }
    };
    deleteAskBid();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.1)" } }}
      >
        <Box sx={style.modalWrapper}>
          <Typography sx={{ fontFamily: "Urbanist" }}>
            Are you sure you want to delete this {type}?
          </Typography>
          <Box sx={style.btnWrapper}>
            <Button
              variant="contained"
              color="error"
              size="medium"
              onClick={handleDelete}
            >
              Delete
            </Button>

            <Button
              variant="outlined"
              size="medium"
              sx={{ color: "black" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

/** @type {import("@mui/material").SxProps} */
const style = {
  modalWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: "20%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  btnWrapper: {
    mt: 5,
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
};

export default DeleteModal;
