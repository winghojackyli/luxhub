import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography, Modal, Box } from "@material-ui/core";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

const KEY = process.env.REACT_APP_STRIPE;

const EditModal = ({ open, handleClose, type, reRender, itemId }) => {
  const user = useSelector((state) => state.currentUser);
  const [newPrice, setNewPrice] = useState();
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await userRequest.put(`/bids/${itemId}`, { newPrice });
        const res = await userRequest.get(`/bids/findUserBids/${user._id}`);
        reRender(res.data);
        await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: newPrice,
        });
      } catch (err) {}
    };
    stripeToken && makeRequest();
  }, [itemId, newPrice, reRender, stripeToken, user._id]);

  const handleEdit = () => {
    const editAskBid = async () => {
      try {
        if (type === "Ask") {
          await userRequest.put(`/asks/${itemId}`, { newPrice });
          const res = await userRequest.get(`/asks/findUserAsks/${user._id}`);
          reRender(res.data);
        }

        handleClose();
      } catch (err) {
        console.log(err);
      }
    };
    editAskBid();
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style.modalWrapper}>
          <Typography sx={{ fontFamily: "Urbanist" }}>
            Please enter the new {type} price:
          </Typography>
          <TextField
            type="number"
            placeholder={`New ${type} Price...`}
            size="lg"
            sx={{ mt: 2 }}
            value={newPrice}
            onChange={(event) => {
              setNewPrice(event.target.value);
            }}
          />
          <Box sx={style.btnWrapper}>
            {type === "Bid" ? (
              <StripeCheckout
                name="LuxHub"
                image="https://i.ibb.co/rpPZJH6/logo.png"
                billingAddress
                shippingAddress
                description={`Tour total is ${newPrice}`}
                amount={newPrice}
                token={onToken}
                stripeKey={KEY}
                locale="en"
              >
                <Button variant="contained" size="medium" onClick={handleEdit}>
                  Confirm
                </Button>
              </StripeCheckout>
            ) : (
              <Button variant="contained" size="medium" onClick={handleEdit}>
                Confirm
              </Button>
            )}

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

export default EditModal;
