import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const PostCard = ({ image, likes, description, comments }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  return (
    <Card sx={{ borderRadius: "5px", margin: "10px", padding: "5px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "5px",
          marginLeft: "10px",
        }}
      >
        <Avatar src="/broken-image.jpg" alt="User" sx={{ height: "25px", width: "25px", marginRight: "5px"}} />
        <Typography variant="body2" sx={{marginRight: "10px"}}>Username</Typography>
      </Box>
      <CardMedia component="img" image={image} alt="Post image" />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Box>
            <IconButton>
              <Favorite sx={{ color: likes > 0 ? "red" : "gray" }} />
            </IconButton>
            <IconButton>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography variant="body2" sx={{marginLeft: "10px"}}>{likes} Likes</Typography>
          </Box>
          <Box>
            <Typography variant="body1">{description}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{
              color: "gray",
            }}>comments</Typography>
          </Box>
          <Box>
            {comments.slice(-2).map((comment) => (
              <Box
                key={comment.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                  marginLeft: "10px",
                }}
              >
                <Avatar src={comment.user} alt={comment.user} sx={{ height: "15px", width: "15px", marginRight: "5px"}} />
                <Typography variant="body2" sx={{marginRight: "10px", fontSize: "12px"}}>{comment.username}</Typography>
                <Typography variant="caption">{comment.text}</Typography>
              </Box>
            ))}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextField
                placeholder="Add a comment"
                multiline={false}
                rows={1}
                value={comment}
                onChange={handleCommentChange}
                sx={{
                  width: "100%",
                  marginTop: "5px",
                  background: "transparent",
                  border: "none",
                  ":hover": {
                    border: "none",
                  },
                }}
              />
              {comment.length > 0 && (
                <Button
                  variant="outlined"
                  sx={{
                    marginTop: "5px",
                    marginLeft: "10px",
                    float: "right",
                    border: "none",
                    ":hover": {
                      border: "none",
                    },
                  }}
                  onClick={() => setComment("")}
                >
                  Post
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
