import React from "react";
import { Box, Typography } from "@mui/material";

const statsDisplay = ({ number, title }) => {
  return (
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
        {number}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          color: "#000",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default statsDisplay;
