import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults([]);
      return;
    }
    axios
      .get(`http://localhost:5000/user/search/${searchTerm}`)
      .then((res) => {
        setSearchResults(res.data.users);
      });
  }, [searchTerm, setSearchResults]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "30px",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        overflowY: "scroll",
        padding: "0% 5%",
      }}
    >
      <TextField
        fullWidth
        placeholder="Search by username"
        variant="outlined"
        sx={{ marginBottom: "20px", marginTop: "20px" }}
        onChange={handleSearchChange}
        InputAdornment={
          <InputAdornment position="end">
            <IconButton>
              <Search />
            </IconButton>
          </InputAdornment>
        }
      />

      {/* Search results */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {searchResults.map((user) => (
          <Card
            key={user.id}
            sx={{ borderRadius: "5px", width: "230px", height: "270px" }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  alt={user.username}
                  sx={{ width: 150, height: 150, mr: 2 }}
                  src={user.dp}
                />
                <Typography variant="h6">{user.username}</Typography>
                {user.isFriend ? (
                  <Button
                    variant="contained"
                    sx={{ marginTop: "10px" }}
                    // onClick={() => navigate(`/chat/${user.username}`)}
                  >
                    Message
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{ marginTop: "10px" }}
                    onClick={() => navigate(`/profile/${user.username}`)}
                  >
                    View Profile
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default SearchPage;
