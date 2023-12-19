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
        maxHeight: "100vh",
      }}
    >
      <NavigationalBar logout={logout} />
      {page === "home" && <HomePage />}
      {page === "search" && <SearchPage />}
      {page === "profile" && <ProfilePage username={id} />}
      {page === "friend-requests" && <FriendRequestsPage />}
      {page === "newpost" && <NewPostPage />}
    </Box>
  );
};

export default MainPage;
