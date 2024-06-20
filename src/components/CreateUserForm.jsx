import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Typography,
  Box,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { API_URL } from "../settings";
import { useSnackbar } from "../context/SnackbarProvider";

const CreateDeltagerForm = ({ onUserCreated, deltagerToUpdate }) => {
  const { showSnackbar } = useSnackbar();
  const [disciplinerOptions, setDisciplinerOptions] = useState([]);

  const [formData, setFormData] = useState({
    navn: "",
    køn: "",
    alder: "",
    klub: "",
    disciplinerIds: [],
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    // Fetch discipliner when component mounts
    fetchDiscipliner();
  }, []);

  const fetchDiscipliner = async () => {
    try {
      const response = await fetch(API_URL + "/api/discipliner");
      if (!response.ok) {
        throw new Error("Failed to fetch discipliner");
      }
      const data = await response.json();
      setDisciplinerOptions(data); // Assuming the response data is an array of objects
    } catch (error) {
      console.error("Error fetching discipliner:", error);
      showSnackbar("Failed to fetch discipliner", "error");
    }
  };

  useEffect(() => {
    if (deltagerToUpdate) {
      setFormData({
        navn: deltagerToUpdate.navn || "",
        køn: deltagerToUpdate.køn || "",
        alder: deltagerToUpdate.alder || "",
        klub: deltagerToUpdate.klub || "",
        disciplinerIds: deltagerToUpdate.disciplinerIds.map((d) => d.id) || [],
      });
    }
  }, [deltagerToUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (deltagerToUpdate) {
        response = await fetch(
          API_URL + `/api/deltagere/${deltagerToUpdate.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
      } else {
        response = await fetch(API_URL + "/api/deltagere", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Deltager operation successful:", data);
      showSnackbar("Operation successful", "success");
      if (onUserCreated) onUserCreated();
    } catch (error) {
      console.error("Error performing operation:", error);
      showSnackbar("Failed to perform operation", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        {deltagerToUpdate ? "Opdater Deltager" : "Opret Ny Deltager"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="navn"
            name="navn"
            label="Navn"
            value={formData.navn}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="alder"
            name="alder"
            label="Alder"
            type="number"
            value={formData.alder}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="køn"
            name="køn"
            label="Køn"
            value={formData.køn}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="klub"
            name="klub"
            label="Klub"
            value={formData.klub}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel id="disciplinerIds-label">Discipliner</InputLabel>
            <Select
              labelId="disciplinerIds-label"
              id="disciplinerIds"
              name="disciplinerIds"
              multiple
              value={formData.disciplinerIds}
              onChange={handleChange}
              input={<OutlinedInput label="Discipliner" />}
              renderValue={(selected) =>
                selected
                  .map(
                    (id) =>
                      disciplinerOptions.find(
                        (disciplin) => disciplin.id === id
                      )?.navn || ""
                  )
                  .join(", ")
              }
              MenuProps={MenuProps}
            >
              {disciplinerOptions.map((disciplin) => (
                <MenuItem key={disciplin.id} value={disciplin.id}>
                  <Checkbox
                    checked={formData.disciplinerIds.includes(disciplin.id)}
                  />
                  <ListItemText
                    primary={`${disciplin.navn} (${disciplin.resultattype})`}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          {deltagerToUpdate ? "Opdater Deltager" : "Opret Deltager"}
        </Button>
      </Box>
    </form>
  );
};

export default CreateDeltagerForm;
