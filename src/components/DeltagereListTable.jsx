import React, { useState, useEffect } from "react";
import DeltagerDialog from "../components/DeltagerDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { API_URL } from "../settings";
import FilterForm from "./FilterComponent";
import { useSnackbar } from "../context/SnackbarProvider";
import DeltagerResultatDialog from "./DeltagerResultatDialog";
import { useNavigate } from "react-router-dom";

export default function DeltagereListTable() {
  const [deltagere, setDeltagere] = useState([]);
  const { showSnackbar } = useSnackbar();
  const [openDialog, setOpenDialog] = useState(false);
  const [deltagerToUpdate, setDeltagerToUpdate] = useState(null);
  const [openResultatDialog, setOpenResultatDialog] = useState(false);
  const Navigate = useNavigate();
  const fetchDeltagere = async (filters) => {
    const query = new URLSearchParams(filters).toString();
    try {
      const response = await fetch(API_URL + `/api/deltagere/filter?${query}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setDeltagere(data);
    } catch (error) {
      showSnackbar("Kunne ikke finde deltagere", "error");
      console.error("Error fetching filtered deltagere:", error);
    }
  };

  useEffect(() => {
    fetchDeltagere({});
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(API_URL + `/api/deltagere/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Remove deleted deltager from state
      setDeltagere((prevDeltagere) =>
        prevDeltagere.filter((deltager) => deltager.id !== id)
      );
    } catch (error) {
      console.error("Error deleting deltager:", error);
    }
  };

  const handleOpenDialog = (deltager) => {
    setDeltagerToUpdate(deltager);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    //setDeltagerToUpdate(null);
    setOpenDialog(false);
    setOpenResultatDialog(false);
  };

  const handleOpenResultatDialog = (deltager) => {
    setDeltagerToUpdate(deltager);
    setOpenResultatDialog(true);
  };

  const handleUserCreated = () => {
    fetchDeltagere({});
    handleCloseDialog();
  };

  const navigateToResultaterPage = (deltagerId) => {
    Navigate(`/deltager/${deltagerId}/resultater`);
  };

  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        Liste af Deltagere
      </Typography>
      <FilterForm onFilter={fetchDeltagere} />
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 500, overflow: "auto" }}
      >
        <Table aria-label="deltagere table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Navn
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  Køn
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  Alder
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  Klub
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  Discipliner
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" fontWeight="bold">
                  Handlinger
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deltagere.map((deltager) => (
              <TableRow key={deltager.id}>
                <TableCell>{deltager.navn}</TableCell>
                <TableCell align="right">{deltager.køn}</TableCell>
                <TableCell align="right">{deltager.alder}</TableCell>
                <TableCell align="right">{deltager.klub}</TableCell>
                <TableCell align="right">
                  {deltager.disciplinerIds
                    .map(
                      (disciplin) =>
                        disciplin.navn + " " + disciplin.resultattype
                    )
                    .join(", ")}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpenDialog(deltager)}
                  >
                    Rediger
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(deltager.id)}
                    style={{ marginLeft: 10 }}
                  >
                    Slet
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpenResultatDialog(deltager)}
                  >
                    Tilføj Resultat
                  </Button>

                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigateToResultaterPage(deltager.id)}
                    style={{ marginLeft: 10 }}
                  >
                    Se Resultater
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeltagerDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        deltagerToUpdate={deltagerToUpdate}
        onUserCreated={handleUserCreated}
      />

      <DeltagerResultatDialog
        open={openResultatDialog}
        handleClose={handleCloseDialog}
        deltagerToUpdate={deltagerToUpdate}
        onUserCreated={handleUserCreated}
      />
    </Box>
  );
}
