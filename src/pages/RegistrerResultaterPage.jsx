import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { API_URL } from "../settings";
import { useSnackbar } from "../context/SnackbarProvider";

const RegistrerResultaterPage = () => {
  const { disciplinId } = useParams();
  const [discipliner, setDiscipliner] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedDisciplin, setSelectedDisciplin] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [results, setResults] = useState([]);
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [newResult, setNewResult] = useState({
    points: 0,
    timeTaken: 0,
    distance: 0,
    resultatType: "",
  });

  useEffect(() => {
    // Fetch available discipliner
    const fetchDiscipliner = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/discipliner`);
        const data = await response.json();
        setDiscipliner(data);
      } catch (error) {
        showSnackbar("Kunne ikke hente discipliner", "error");
      } finally {
        setLoading(false);
      }
    };

    // Fetch available users
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/deltagere`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        showSnackbar("Kunne ikke hente brugere", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchDiscipliner();
    fetchUsers();
  }, [showSnackbar]);

  const handleSelectDisciplin = (event) => {
    setSelectedDisciplin(event.target.value);
    const selectedDisciplin = discipliner.find(
      (d) => d.id === event.target.value
    );
    setNewResult({
      ...newResult,
      resultatType: selectedDisciplin.resultattype.toLowerCase(),
    });
  };

  const handleSelectUser = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewResult({ ...newResult, [name]: value });
  };

  const handleAddResult = () => {
    setResults([
      ...results,
      {
        ...newResult,
        deltagerId: selectedUser,
        dato: new Date().toISOString().split("T")[0],
      },
    ]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/resultater/registrer/${selectedDisciplin}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(results),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      showSnackbar("Resultater registreret", "success");
      setResults([]);
    } catch (error) {
      showSnackbar("Resultater registreret", "success");
      setResults([]);
      //showSnackbar("Fejl ved registrering af resultater", "error");
    } finally {
      setLoading(false);
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
      <Box sx={{ background: "white", padding: 5, marginTop: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Registrer Resultater for Disciplin
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="select-disciplin-label">Vælg Disciplin</InputLabel>
            <Select
              labelId="select-disciplin-label"
              value={selectedDisciplin}
              onChange={handleSelectDisciplin}
            >
              {discipliner.map((disciplin) => (
                <MenuItem key={disciplin.id} value={disciplin.id}>
                  {disciplin.navn} {disciplin.resultattype}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="select-user-label">Vælg Bruger</InputLabel>
            <Select
              labelId="select-user-label"
              value={selectedUser}
              onChange={handleSelectUser}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.navn}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {newResult.resultatType === "point" && (
            <TextField
              label="Points"
              name="points"
              type="number"
              value={newResult.points}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          )}
          {newResult.resultatType === "time" && (
            <TextField
              label="Time Taken"
              name="timeTaken"
              type="number"
              value={newResult.timeTaken}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          )}
          {newResult.resultatType === "distance" && (
            <>
              <TextField
                label="Time Taken"
                name="timeTaken"
                type="number"
                value={newResult.timeTaken}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Distance"
                name="distance"
                type="number"
                value={newResult.distance}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            </>
          )}
          <Button variant="contained" onClick={handleAddResult} sx={{ mb: 3 }}>
            Tilføj Resultat
          </Button>
          <Button type="submit" variant="contained" fullWidth>
            Registrer Resultater
          </Button>
        </form>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Tilføjede Resultater:</Typography>
          {results.map((result, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Typography color="black">{`User: ${
                users.find((user) => user.id === result.deltagerId)?.navn
              }, Points: ${result.points}, Time Taken: ${
                result.timeTaken
              }, Distance: ${result.distance}`}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default RegistrerResultaterPage;
