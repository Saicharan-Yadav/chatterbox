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

import statsDisplay from "./statsDisplay";

const ProfilePage = ({ username }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    dp: "",
    posts: [],
    friends: [],
    owner: false,
    isFriend: false,
    isRequested: false,
    isPending: false,
  });

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }
    axios
      .get(`http://localhost:5000/user/profile/${username}`)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.data);
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  }, [username]);

  const handleButton = () => {
    if (user?.isFriend) {
      return (
        <Button
          variant="contained"
          onClick={() => {
            axios.get(
              `http://localhost:5000/user/remove-friend/${user.username}`
            );
            setUser({ ...user, isFriend: false });
          }}
        >
          Remove Friend
        </Button>
      );
    } else if (user?.isRequested) {
      return (
        <Button variant="contained" disabled>
          Requested
        </Button>
      );
    } else if (user?.isPending) {
      return (
        <Button
          variant="contained"
          onClick={() => {
            axios.get(
              `http://localhost:5000/user/accept-request/${user.username}`
            );
            setUser({ ...user, isFriend: true });
          }}
        >
          Accept
        </Button>
      );
    } else if (user?.owner) {
      return (
        <Button variant="contained" startIcon={<Edit />}>
          Edit Profile
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          sx={{ color: "#000" }}
          onClick={() => {
            axios.get(`http://localhost:5000/user/add-friend/${user.username}`);
            setUser({ ...user, isRequested: true });
          }}
        >
          Add Friend
        </Button>
      );
    }
  };

  const handlePosts = () => {
    if (user?.isFriend || user?.owner) {
      return user?.posts?.map((post) => (
        <Card
          sx={{
            width: "300px",
            height: "300px",
            margin: "10px",
            position: "relative",
          }}
        >
          <CardMedia
            component="img"
            height="100%"
            image={post.image}
            alt={post.title}
          />
        </Card>
      ));
    } else {
      return (
        <Typography variant="body1">Only friends can see posts</Typography>
      );
    }
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
            {statsDisplay({
              number: user?.posts?.length,
              title: "Posts",
            })}
            {statsDisplay({
              number: user?.friends?.length,
              title: "Friends",
            })}
          </Box>
          <Box
            sx={{
              marginTop: "10px",
            }}
          >
            {handleButton()}
          </Box>
        </Box>
      </Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "24px" }}>
        Posts
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {handlePosts()}
      </Box>
    </Box>
  );
};

export default ProfilePage;
