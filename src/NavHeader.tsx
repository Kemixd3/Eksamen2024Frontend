// @ts-nocheck
import * as React from "react";
import { NavLink } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useAuth } from "./context/AuthProvider";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import { Link } from "react-router-dom";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: "inherit",
  textDecoration: "none",
  padding: theme.spacing(1, 2),
}));

export default function NavHeader() {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [clickstate, setClickstate] = React.useState(null);
  const open = Boolean(clickstate);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleClose = () => {
    setClickstate(null);
  };

  const handleClick = (event) => {
    setClickstate(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <StyledNavLink to="/">Home</StyledNavLink>
      </MenuItem>

      {!auth.isLoggedIn() ? (
        <MenuItem>
          <StyledNavLink to="/login">Login</StyledNavLink>
        </MenuItem>
      ) : (
        <>
          {auth.username && (
            <MenuItem>
              <Typography color="white">
                Logged in as {auth.username}
              </Typography>
            </MenuItem>
          )}
          <MenuItem>
            <StyledNavLink to="/logout">Logout</StyledNavLink>
          </MenuItem>
          <MenuItem>
            <StyledNavLink to="/admin">Admin panel</StyledNavLink>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary" enableColorOnDark>
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, fontStyle: "italic" }}
          >
            Atletik Resultater Leaderboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <StyledNavLink to="/">Home</StyledNavLink>

            {!auth.isLoggedIn() ? (
              <StyledNavLink to="/login">Login</StyledNavLink>
            ) : (
              <>
                <StyledNavLink to="/logout">Logout</StyledNavLink>

                <div>
                  <IconButton
                    id="fade-button"
                    aria-controls={open ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{ typography: "body2" }} // Set typography variant to body2 to make text smaller
                  >
                    <Typography color="white" sx={{ mr: 1 }}>
                      Admin panel
                    </Typography>{" "}
                    {/* Use Typography for consistent styling */}
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={clickstate}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    {/* Use Link from react-router-dom to navigate to routes */}
                    <MenuItem
                      component={Link}
                      to="/Opret"
                      onClick={handleClose}
                    >
                      Opret ny deltager
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/deltagere"
                      onClick={handleClose}
                    >
                      Søg efter deltagere
                    </MenuItem>

                    <MenuItem
                      component={Link}
                      to="/resultater"
                      onClick={handleClose}
                    >
                      Batch add resultater
                    </MenuItem>
                  </Menu>
                </div>
                {auth.username && (
                  <Typography
                    sx={{ alignSelf: "center", padding: "0 16px" }}
                    color="white"
                  >
                    Logged in as {auth.username}
                  </Typography>
                )}
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
