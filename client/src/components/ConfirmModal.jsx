import { Typography, Modal, Box, Button } from "@material-ui/core";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";

const KEY = process.env.REACT_APP_STRIPE;

export default function ConfirmModal({
  type,
  handleClose,
  open,
  bestPrice,
  bestBidAsk,
  productId,
  size,
}) {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser);
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/orders", {
          productId,
          productName: bestBidAsk.productName,
          size,
          price: bestPrice,
          seller: bestBidAsk.userId,
          buyer: currentUser._id,
        });
        await userRequest.delete("/asks/" + bestBidAsk._id);
        await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: bestBidAsk.price,
        });
        navigate("/successOrder", { state: res.data });
      } catch (err) {}
    };
    stripeToken && makeRequest();
  }, [stripeToken]);

  const confirmOrder = async () => {
    try {
      const res = await userRequest.post("/orders", {
        productId,
        size,
        productName: bestBidAsk.productName,
        price: bestBidAsk.price,
        seller: currentUser._id,
        buyer: bestBidAsk.userId,
      });
      await userRequest.delete("/bids/" + bestBidAsk._id);
      navigate("/successOrder", { state: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style.modalWrapper}>
          {type === "Ask" ? (
            <Typography sx={{ fontFamily: "Urbanist" }}>
              The Highest Bid now is ${bestPrice}, will you take this offer and
              sell at ${bestPrice}?
            </Typography>
          ) : (
            <Typography sx={{ fontFamily: "Urbanist" }}>
              The Lowest Ask now is ${bestPrice}, will you take this offer and
              buy at ${bestPrice}?
            </Typography>
          )}
          <Box sx={style.btnWrapper}>
            {type === "Ask" ? (
              <Button
                variant="outlined"
                size="medium"
                sx={{ color: "black" }}
                onClick={type === "Ask" && confirmOrder}
              >
                Confirm
              </Button>
            ) : (
              <StripeCheckout
                name="LuxHub"
                image="https://i.ibb.co/rpPZJH6/logo.png"
                billingAddress
                shippingAddress
                description={`Tour total is ${bestPrice}`}
                amount={bestPrice * 100}
                token={onToken}
                stripeKey={KEY}
                locale="en"
              >
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ color: "black" }}
                  onClick={handleClose}
                >
                  Confirm
                </Button>
              </StripeCheckout>
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
}

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
