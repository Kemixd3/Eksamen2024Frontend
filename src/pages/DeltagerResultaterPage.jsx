import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Container,
  CircularProgress,
  Button,
} from "@mui/material";
import { API_URL } from "../settings";
import { useSnackbar } from "../context/SnackbarProvider";

const DeltagerResultaterPage = () => {
  const { deltagerId } = useParams();
  const [resultater, setResultater] = useState([]);
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResultater = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/api/resultater/${deltagerId}/resultater`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setResultater(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        showSnackbar("Kunne ikke hente resultater", "error");
        console.error("Error fetching resultater:", error);
      }
    };

    fetchResultater();
  }, [deltagerId, showSnackbar]);

  const handleDeleteResultat = async (resultatId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/resultater/${deltagerId}/resultater/${resultatId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      showSnackbar("Resultat slettet", "success");
      // Refetch resultater after deletion
      //fetchResultater();
    } catch (error) {
      setLoading(false);
      showSnackbar("Fejl ved sletning af resultat", "error");
      console.error("Error deleting resultat:", error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Resultater for Deltager ID: {deltagerId}
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table aria-label="resultater table">
            <TableHead>
              <TableRow>
                <TableCell>Disciplin Navn</TableCell>
                <TableCell align="right">Distance</TableCell>
                <TableCell align="right">Resultattype</TableCell>
                <TableCell align="right">Resultat</TableCell>
                <TableCell align="right">Handling</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resultater.map((resultat) => (
                <TableRow key={resultat.id}>
                  <TableCell>{resultat.disciplin_name}</TableCell>
                  <TableCell align="right">
                    {resultat.distance || "-"}
                  </TableCell>
                  <TableCell align="right">
                    {resultat.resultattype || "-"}
                  </TableCell>
                  <TableCell align="right">
                    {resultat.time_taken || resultat.points || "-"}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteResultat(resultat.id)}
                    >
                      Slet
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default DeltagerResultaterPage;
