import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { API_URL } from "../settings";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.navn}
        </TableCell>
        <TableCell align="right">{row.køn}</TableCell>
        <TableCell align="right">{row.alder}</TableCell>
        <TableCell align="right">{row.klub}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Discipliner
              </Typography>
              <Table size="small" aria-label="discipliner">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Disciplin Navn
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="subtitle1" fontWeight="bold">
                        Resultattype
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.discipliner.map((disciplin) => (
                    <TableRow key={disciplin.id}>
                      <TableCell component="th" scope="row">
                        {disciplin.navn}
                      </TableCell>
                      <TableCell align="left">
                        {disciplin.resultattype}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    navn: PropTypes.string.isRequired,
    køn: PropTypes.string.isRequired,
    alder: PropTypes.number.isRequired,
    klub: PropTypes.string.isRequired,
    discipliner: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        navn: PropTypes.string.isRequired,
        resultattype: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function CollapsibleTable({ fetchKey }) {
  const [deltagere, setDeltagere] = useState([]);

  useEffect(() => {
    async function fetchDeltagere() {
      try {
        const response = await fetch(API_URL + "/api/deltagere");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDeltagere(data);
      } catch (error) {
        console.error("Error fetching deltagere:", error);
      }
    }
    fetchDeltagere();
  }, [fetchKey]);

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 500, overflow: "auto" }}>
      <Table aria-label="collapsible table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell />
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
          </TableRow>
        </TableHead>
        <TableBody>
          {deltagere.map((deltager) => (
            <Row key={deltager.id} row={deltager} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
