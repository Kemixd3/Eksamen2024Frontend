import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import CreateUserForm from "../components/CreateUserForm"; // Adjust the path as per your project structure
import Card from "@mui/material/Card";
import CollapsibleTable from "../components/DeltagereTable";

const CreateUserPage = () => {
  const [fetchKey, setFetchKey] = useState(0);

  const handleUserCreated = () => {
    setFetchKey(fetchKey + 1);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Opret Ny Deltager
        </Typography>
        <Card sx={{ display: "flex", padding: 5 }} color="blue">
          <CreateUserForm onUserCreated={handleUserCreated} />
        </Card>
      </Box>
      <CollapsibleTable fetchKey={fetchKey} />
    </Container>
  );
};

export default CreateUserPage;
