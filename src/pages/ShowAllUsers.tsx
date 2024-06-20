import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import CreateUserForm from "../components/CreateUserForm"; // Adjust the path as per your project structure
import Card from "@mui/material/Card";
import CollapsibleTable from "../components/DeltagereListTable";

const ShowAllUsers = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4} mb={5}></Box>
      <CollapsibleTable />
    </Container>
  );
};

export default ShowAllUsers;
