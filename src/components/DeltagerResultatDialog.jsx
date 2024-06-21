import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { API_URL } from "../settings";
import { useSnackbar } from "../context/SnackbarProvider";

const DeltagerResultatDialog = ({
  open,
  handleClose,
  deltagerToUpdate,
  onUserCreated,
}) => {
  const [disciplinId, setDisciplinId] = useState("");
  const [disciplinType, setDisciplinType] = useState("");
  const [resultatValue, setResultatValue] = useState("");
  const [distance, setDistance] = useState("");
  const [timeInMinutes, setTimeInMinutes] = useState(""); // State to hold time in minutes
  const [date, setDate] = useState("");
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (deltagerToUpdate) {
      setDisciplinId("");
      setDisciplinType("");
      setResultatValue("");
      setDistance("");
      setTimeInMinutes("");
      setDate("");
    }
  }, [deltagerToUpdate]);

  const handleDisciplinChange = (e) => {
    const selectedDisciplin = deltagerToUpdate.disciplinerIds.find(
      (disciplin) => disciplin.id === parseInt(e.target.value)
    );
    if (selectedDisciplin) {
      setDisciplinId(selectedDisciplin.id);
      setDisciplinType(selectedDisciplin.resultattype);
    } else {
      setDisciplinId("");
      setDisciplinType("");
    }
  };

  const handleSubmit = async () => {
    let result = {
      disciplinId,
      deltagerId: deltagerToUpdate.id,
    };

    if (disciplinType === "POINT") {
      result.points = resultatValue;
    } else if (disciplinType === "DISTANCE") {
      result.distance = parseInt(distance);
      result.timeTaken = parseInt(timeInMinutes); // Convert timeInMinutes to integer
    } else if (disciplinType === "TIME") {
      result.dato = date;
      result.timeTaken = parseInt(timeInMinutes); // Convert timeInMinutes to integer
    }

    try {
      const response = await fetch(
        `${API_URL}/api/resultater/${disciplinType.toLowerCase()}/${disciplinId}/${
          deltagerToUpdate.id
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(result),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create resultat");
      }

      onUserCreated();
      showSnackbar("Nyt Resultat er tilføjet", "success");
      handleClose();
    } catch (error) {
      console.error("Error creating resultat:", error);
      showSnackbar("Tilføjelse af Resultat fejlede: " + error, "error");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Tilføj Resultat</DialogTitle>
      <DialogContent>
        <TextField
          select
          fullWidth
          label="Disciplin"
          value={disciplinId}
          onChange={handleDisciplinChange}
          variant="outlined"
          margin="normal"
        >
          {deltagerToUpdate?.disciplinerIds.map((disciplin) => (
            <MenuItem key={disciplin.id} value={disciplin.id}>
              {disciplin.navn} ({disciplin.resultattype})
            </MenuItem>
          ))}
        </TextField>
        {disciplinType === "POINT" && (
          <TextField
            fullWidth
            label="Resultat"
            value={resultatValue}
            onChange={(e) => setResultatValue(e.target.value)}
            variant="outlined"
            margin="normal"
          />
        )}
        {(disciplinType === "DISTANCE" || disciplinType === "TIME") && (
          <>
            <TextField
              fullWidth
              label={disciplinType === "DISTANCE" ? "Distance (Meter)" : "Dato"}
              value={disciplinType === "DISTANCE" ? distance : date}
              onChange={(e) =>
                disciplinType === "DISTANCE"
                  ? setDistance(e.target.value)
                  : setDate(e.target.value)
              }
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              type={disciplinType === "DISTANCE" ? "text" : "date"}
            />
            <TextField
              fullWidth
              label="Tid (minutter)"
              value={timeInMinutes}
              onChange={(e) => setTimeInMinutes(e.target.value)}
              variant="outlined"
              margin="normal"
              type="number"
              InputProps={{
                inputProps: { min: 0 }, // Ensure non-negative input
              }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Annuller
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Gem
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeltagerResultatDialog;
