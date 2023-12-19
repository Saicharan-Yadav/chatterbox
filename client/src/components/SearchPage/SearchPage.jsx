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

const fakeData = [
  {
    id: 17,
    dp: "https://random.imagecdn.app/150/150",
    username: "LunaStar",
  },
  {
    id: 18,
    dp: "https://random.imagecdn.app/150/150",
    username: "CloudDancer777",
  },
  {
    id: 19,
    dp: "https://random.imagecdn.app/150/150",
    username: "EmeraldEmber",
  },
  {
    id: 20,
    dp: "https://random.imagecdn.app/150/150",
    username: "WhisperingWillow",
  },
  {
    id: 21,
    dp: "https://random.imagecdn.app/150/150",
    username: "BookishBard",
  },
  {
    id: 22,
    dp: "https://random.imagecdn.app/150/150",
    username: "SkybornSeeker",
  },
  {
    id: 23,
    dp: "https://random.imagecdn.app/150/150",
    username: "TwinklingTrailblazer",
  },
  {
    id: 24,
    dp: "https://random.imagecdn.app/150/150",
    username: "CosmicConstellation",
  },
  {
    id: 25,
    dp: "https://random.imagecdn.app/150/150",
    username: "MountainWhisperer",
  },
  {
    id: 26,
    dp: "https://random.imagecdn.app/150/150",
    username: "StarlitStoryteller",
  },
  {
    id: 27,
    dp: "https://random.imagecdn.app/150/150",
    username: "DreamweaverDawn",
  },
  {
    id: 28,
    dp: "https://random.imagecdn.app/150/150",
    username: "OceanEchoes",
  },
  {
    id: 29,
    dp: "https://random.imagecdn.app/150/150",
    username: "Windrider",
  },
  {
    id: 30,
    dp: "https://random.imagecdn.app/150/150",
    username: "MoonlightMuse",
  },
  {
    id: 31,
    dp: "https://random.imagecdn.app/150/150",
    username: "SunseekerSage",
  },
];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults([]);
      return;
    }
    const results = fakeData.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

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
                <Button variant="outlined" sx={{ marginTop: "10px" }}>
                  Add Friend
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default SearchPage;
