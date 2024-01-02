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
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const NavigationalBar = ({ logout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    {
      name: "Home",
      icon: <Home />,
      path: "/",
    },
    {
      name: "New Post",
      icon: <AddPhotoAlternateIcon />,
      path: "/new-post",
    },
    {
      name: "Search",
      icon: <Search />,
      path: "/search",
    },
    {
      name: "Friend Requests",
      icon: <PersonAddIcon />,
      path: "/friend-requests",
    },
    {
      name: "Profile",
      icon: <Person />,
      path: `/profile/${Cookies.get("token")}`,
    },
    {
      name: "Logout",
      icon: <LogoutIcon />,
      path: "/logout",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        maxHeight: "100vh",
        width: "450px",
        borderRadius: "20px",
        backgroundColor: "#fff",
        margin: "10px 0 10px 10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
      }}
    >
      <Box sx={{ width: "100%", padding: "20px" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/");
              }}
              sx={{
                color: "#000",
                backgroundColor: "#fff",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
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
          {links.map((link) => (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  if (link.name === "Logout") {
                    logout();
                  } else {
                    navigate(link.path);
                  }
                }}
                sx={{
                  color: "#000",
                  backgroundColor:
                    location.pathname === link.path ? "#AFC8AD" : "#fff",
                  borderRadius: "20px",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor:
                      location.pathname !== link.path ? "#D2E3C8" : "#AFC8AD",
                  },
                }}
              >
                <ListItemIcon>{link.icon}</ListItemIcon>
                <Typography>{link.name}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default NavigationalBar;
