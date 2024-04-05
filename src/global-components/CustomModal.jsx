import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import ReactDom from "react-dom";
const CustomModal = ({
  isOpen,
  onClose,
  onOk,
  title = "",
  children,
  maxWidth = "sm",
  isOkDisabled = false,
  isOkVisible = true,
}) => {
  return ReactDom.createPortal(
    <Dialog
      open={isOpen}
      keepMounted
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
        {isOkVisible ? (
          <Button variant="contained" onClick={onOk} disabled={isOkDisabled}>
            Done
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>,
    document.getElementById("portal")
  );
};

export default CustomModal;
