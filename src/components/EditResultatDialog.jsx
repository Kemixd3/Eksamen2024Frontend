import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const EditResultatDialog = ({ open, onClose, resultat, onSave }) => {
  const [formValues, setFormValues] = useState({
    distance: resultat.distance || "",
    resultattype: resultat.resultattype || "",
    time_taken: resultat.time_taken || 0,
    points: resultat.points || "",
  });

  useEffect(() => {
    setFormValues({
      distance: resultat.distance || "",
      resultattype: resultat.resultattype || "",
      time_taken: resultat.time_taken || 0,
      points: resultat.points || "",
    });
  }, [resultat]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]:
        name === "distance" || name === "time_taken" ? Number(value) : value,
    });
  };

  const handleSave = () => {
    onSave(formValues);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Resultat</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Distance"
          name="distance"
          value={formValues.distance}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Resultattype"
          name="resultattype"
          value={formValues.resultattype}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Time Taken"
          name="time_taken"
          value={formValues.time_taken}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Points"
          name="points"
          value={formValues.points}
          onChange={handleInputChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditResultatDialog;
