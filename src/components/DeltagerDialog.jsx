import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import CreateDeltagerForm from "../components/CreateUserForm";
const DeltagerDialog = ({
  open,
  handleClose,
  deltagerToUpdate,
  onUserCreated,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {deltagerToUpdate ? "Opdater Deltager" : "Opret Ny Deltager"}
      </DialogTitle>
      <DialogContent>
        <CreateDeltagerForm
          deltagerToUpdate={deltagerToUpdate}
          onUserCreated={onUserCreated}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Annuller
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeltagerDialog;
