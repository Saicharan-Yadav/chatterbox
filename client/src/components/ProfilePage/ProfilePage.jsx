import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ username }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    dp: "",
    posts: [],
  });

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }
    axios
      .get(`http://localhost:5000/user/${username}`)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.user);
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  }, [username]);

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
      <Box
        sx={{
          display: "flex",
          gap: "30px",
          width: "100%",
          paddingTop: "30px",
          paddingBottom: "30px",
          borderBottom: "2px solid #333",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            alt={user?.username}
            sx={{ width: 150, height: 150, objectFit: "cover" }}
            src={user?.dp}
          />
          <Typography variant="h6">{user?.username}</Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "30px",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "#000",
                }}
              >
                {user?.posts.length}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "#000",
                }}
              >
                Posts
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "#000",
                }}
              >
                {user?.friends?.length}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: "#000",
                }}
              >
                Friends
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "10px",
            }}
          >
            <Button variant="contained" startIcon={<Edit />}>
              Edit Profile
            </Button>
          </Box>
        </Box>
      </Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "24px" }}>
        Posts
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {user?.posts.map((post, i) => (
          <Card key={i} sx={{ borderRadius: "5px", width: "30%" }}>
            <CardMedia component="img" image={post.image} alt="Post image" />
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ProfilePage;
