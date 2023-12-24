import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { Home, Search, Person } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Cookies from "js-cookie";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const NavigationalBar = ({ logout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box sx={{ display: "flex", maxHeight: "100vh", width: "300px" }}>
      <Box sx={{ backgroundColor: "#f5f5f5", width: "250px", padding: "20px" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/");
              }}
              sx={{
                color: "#000",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                }}
              >
                Chatter Box
              </Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigate("/")}
              sx={{
                backgroundColor:
                  location.pathname === "/" ? "#ddd" : "transparent",
              }}
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <Typography variant="body1">Home</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigate("/new-post")}
              sx={{
                backgroundColor:
                  location.pathname === "/new-post" ? "#ddd" : "transparent",
              }}
            >
              <ListItemIcon>
                <AddPhotoAlternateIcon />
              </ListItemIcon>
              <Typography variant="body1">New Post</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigate("/search")}
              sx={{
                backgroundColor:
                  location.pathname === "/search" ? "#ddd" : "transparent",
              }}
            >
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <Typography variant="body1">Search</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigate("/friend-requests")}
              sx={{
                backgroundColor:
                  location.pathname === "/friend-requests"
                    ? "#ddd"
                    : "transparent",
              }}
            >
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <Typography variant="body1">Friend Requests</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigate(`/profile/${Cookies.get("token")}`)}
              sx={{
                backgroundColor: location.pathname === `/profile/${Cookies.get("token")}`
                  ? "#ddd"
                  : "transparent",
              }}
            >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <Typography variant="body1">Profile</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                localStorage.removeItem("user");
                logout();
                // navigate("/");
              }}
              sx={{
                ":hover": {
                  backgroundColor: "#ddd",
                },
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <Typography variant="body1">Logout</Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default NavigationalBar;
