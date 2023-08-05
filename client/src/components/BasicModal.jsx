import * as React from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import AskBidData from "./AskBidData";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ handleClose, open, type }) {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <AskBidData type={type} />
        </Box>
      </Modal>
    </div>
  );
}

/*


<Typography id="modal-modal-title" variant="h6" component="h2">
            {type}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>

*/
