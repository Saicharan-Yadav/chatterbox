import React, { useState } from "react";
import PostCard from "./PostCard";
import { Box, Grid } from "@mui/material";

const HomePage = () => {
  const [posts, setPost] = useState([
    {
      image: "https://random.imagecdn.app/500/500",
      likes: 100,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      comments: [],
    },
    {
      image: "https://random.imagecdn.app/500/500",
      likes: 100,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      comments: [
        {
          id: 1,
          user: "https://random.imagecdn.app/50/50",
          username: "John Doe",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          id: 2,
          user: "https://random.imagecdn.app/50/50",
          username: "Jane Doe",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        }
      ],
    },
    {
      image: "https://random.imagecdn.app/500/500",
      likes: 100,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      comments: [],
    },
  ]);

  return (
    <Box
      sx={{
        alignContent: "center",
        height: "100vh",
        width: "100%",
        overflowY: "scroll",
        padding: "0% 20%",
      }}
    >
      <Box
        sx={{
          alignContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <PostCard {...post} />
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default HomePage;
