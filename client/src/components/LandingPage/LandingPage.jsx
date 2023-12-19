import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function LandingPage({ login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChanges = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  const navigate = useNavigate();
  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/auth/signin", { username, password })
      .then((res) => {
        if (res.status === 201) {
          setUsername("");
          setPassword("");
          Cookies.set("token", res.data.token, { expires: 1});
          alert(res.data.msg);
          login();
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  const handleShowPasswordChange = (event) => {
    setShowPassword(event.target.checked);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "0px 60px",
        height: "100vh",
      }}
      sm={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: 2, textAlign: "left", marginLeft: "20px" }}>
        <Typography variant="h1" sx={{ color: "#333", fontWeight: 700 }}>
          Your voice, amplified.
        </Typography>
        <Typography variant="body1" sx={{ color: "#666", marginTop: "20px" }}>
          Connect with like-minded people, share your thoughts, and spark
          conversations that matter.
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          marginRight: "60px",
        }}
      >
        <Typography variant="h6" sx={{ color: "#333", marginBottom: "10px" }}>
          ChatterBox
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "#333", marginBottom: "10px", textAlign: "center" }}
        >
          Log In
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          name="username"
          onChange={handleChanges}
          sx={{ backgroundColor: "#fff", marginBottom: "15px" }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          name="password"
          sx={{ backgroundColor: "#fff" }}
          onChange={handleChanges}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showPassword}
              onChange={handleShowPasswordChange}
            />
          }
          label="Show Password"
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "auto", marginTop: "15px" }}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
        <Link
          onClick={() => navigate("/sign-up")}
          sx={{
            fontSize: "15px",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Don't have an account? Sign Up
        </Link>
      </Box>
    </Box>
  );
}

export default LandingPage;
