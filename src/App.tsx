import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import RoleChecker from "./components/RoleChecker";
import Login from "./components/Login";
import Logout from "./components/logout";
import Home from "./Home";
import CreateUserPage from "./pages/CreateUserPage";
import DeltagereListTable from "./pages/ShowAllUsers";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SnackbarProvider } from "./context/SnackbarProvider";
const theme = createTheme({
  palette: {
    secondary: {
      main: "#262E57",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/deltagere" element={<DeltagereListTable />} />
            <Route path="/opret" element={<CreateUserPage />} />

            <Route path="*" element={<h2>Not Found</h2>} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/admin"
              element={<RoleChecker roles={["ADMIN"]}>hey admin</RoleChecker>}
            />
          </Routes>
        </Layout>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
