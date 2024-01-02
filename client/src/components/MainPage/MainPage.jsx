import React from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

import NavigationalBar from "../utils/NavigationalBar";
import HomePage from "../HomePage/HomePage";
import SearchPage from "../SearchPage/SearchPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import FriendRequestsPage from "../FriendRequestsPage/FriendRequestsPage";
import NewPostPage from "../NewPostPage/NewPostPage";

const MainPage = ({ page, logout }) => {
  const { id } = useParams();
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        gap: "20px",
        backgroundColor: "#c4c4c4",
      }}
    >
      <NavigationalBar logout={logout} />
      <Box
        sx={{
          maxHeight: "100vh",
          width: "100%",
          overflowY: "scroll",
          backgroundColor: "#fff",
          borderRadius: "20px",
          margin: "10px 0 10px 0px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
          paddingTop: "10px",
        }}
      >
        {page === "home" && <HomePage />}
        {page === "search" && <SearchPage />}
        {page === "profile" && <ProfilePage username={id} />}
        {page === "friend-requests" && <FriendRequestsPage />}
        {page === "newpost" && <NewPostPage />}
      </Box>
    </Box>
  );
};

export default MainPage;
