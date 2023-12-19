import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Avatar, Button } from "@mui/material";

const friendRequests = [
  {
    id: 1,
    dp: "https://random.imagecdn.app/50/50",
    username: "John Doe",
  },
  {
    id: 2,
    dp: "https://random.imagecdn.app/50/50",
    username: "Jane Doe",
  },
  {
    id: 3,
    dp: "https://random.imagecdn.app/50/50",
    username: "John Smith",
    sender: true,
  },
  {
    id: 4,
    dp: "https://random.imagecdn.app/50/50",
    username: "Jane Smith",
  },
];

const FriendRequestsPage = () => {
  const [currentTab, setCurrentTab] = useState("sent");

  const handleTabChange = (event, newTab) => {
    setCurrentTab(newTab);
  };

  const renderUserList = (requests) => (
    <Box
      sx={{
        display: "flex",
        gap: "30px",
        flexDirection: "column",
        marginLeft: "30px",
        marginTop: "10px",
      }}
    >
      {requests.map((user) => (
        <Box
          key={user.id}
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Avatar alt={user.username} src={user.dp} />
            <Typography variant="h6">{user.username}</Typography>
          </Box>
          {currentTab === "received" ? (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="outlined" size="small">
                Accept
              </Button>
              <Button variant="outlined" size="small">
                Ignore
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="outlined" size="small">
                cancel
              </Button>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );

  const sentRequests = friendRequests.filter((request) => request.sender);
  const receivedRequests = friendRequests.filter((request) => !request.sender);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        overflowY: "scroll",
        padding: "0% 5%",
      }}
    >
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        sx={{
          width: "100%",
          marginTop: "30px",
        }}
      >
        <Tab label="Sent" value="sent" />
        <Tab label="Received" value="received" />
      </Tabs>
      {currentTab === "sent" && renderUserList(sentRequests)}
      {currentTab === "received" && renderUserList(receivedRequests)}
    </Box>
  );
};

export default FriendRequestsPage;
