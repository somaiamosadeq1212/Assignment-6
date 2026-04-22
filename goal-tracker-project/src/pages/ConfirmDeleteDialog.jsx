import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from "@mui/material";

export default function ConfirmDeleteDialog({ open, onCancel, onConfirm }) {

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this goal?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>No</Button>
        <Button variant="contained" color="error" onClick={onConfirm}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}
