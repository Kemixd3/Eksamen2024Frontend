import React, { useState } from "react";
import { Box, Button, TextField, MenuItem, Grid } from "@mui/material";

export default function FilterForm({ onFilter }) {
  const [filters, setFilters] = useState({
    køn: "",
    minAlder: "",
    maxAlder: "",
    klub: "",
    disciplin: "",
    navn: "",
    alderGroup: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mb: 3,
        p: 5,
        background: "white",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="køn"
            label="Køn"
            sx={{ width: "100%" }}
            value={filters.køn}
            onChange={handleChange}
            select
          >
            <MenuItem value="">Alle</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="minAlder"
            label="Min Alder"
            value={filters.minAlder}
            onChange={handleChange}
            type="number"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="maxAlder"
            label="Max Alder"
            value={filters.maxAlder}
            onChange={handleChange}
            type="number"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="klub"
            label="Klub"
            value={filters.klub}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="disciplin"
            label="Disciplin"
            value={filters.disciplin}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="navn"
            label="Navn"
            value={filters.navn}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="alderGroup"
            label="Aldersgruppe"
            sx={{ width: "100%" }}
            value={filters.alderGroup}
            onChange={handleChange}
            select
          >
            <MenuItem value="">Alle</MenuItem>
            <MenuItem value="Børn (6-9)">Børn (6-9)</MenuItem>
            <MenuItem value="Unge (10-13)">Unge (10-13)</MenuItem>
            <MenuItem value="Junior (14-22)">Junior (14-22)</MenuItem>
            <MenuItem value="Voksne (23-40)">Voksne (23-40)</MenuItem>
            <MenuItem value="Senior (41+)">Senior (41+)</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button type="submit" variant="contained" sx={{ width: "100%" }}>
            Filter
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
