import React, { useEffect, useState, watch } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CollapsibleTable from "./components/DeltagereTable";
import DatePicker from "react-datepicker";
import { API_URL } from "./settings";
import { Skeleton, Button, Divider } from "@mui/material";

import "./home.css";

export default function Home() {
  return (
    <Container fluid="md" className="pa-0 pt-0 mt-5">
      <Row>
        <Col>
          {" "}
          <h1>Deltagere Oversigt</h1>
        </Col>
      </Row>
      <row>
        <Col>
          <CollapsibleTable />{" "}
        </Col>
      </row>
    </Container>
  );
}
