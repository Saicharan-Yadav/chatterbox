import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = ({ login }) => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();
    if (
      userInfo.username === "" ||
      userInfo.email === "" ||
      userInfo.password === ""
    ) {
      alert("Please fill out all fields.");
      return;
    }
    if (userInfo.username.length < 3 && userInfo.username.includes(" ")) {
      alert("Username must be at least 3 characters long with no spaces.");
      return;
    }
    if (userInfo.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    axios
      .post("http://localhost:5000/auth/signup", userInfo)
      .then((res) => {
        if (res.status === 201) {
          setUserInfo({
            username: "",
            email: "",
            password: "",
          });
          alert(res.data.msg);
          localStorage.setItem("user", true);
          login();
          navigate("/");
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  const handleInputChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleShowPasswordChange = (event) => {
    setShowPassword(event.target.checked);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Chatter Box Signup
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSignUp}>
            <TextField
              required
              label="Username"
              variant="outlined"
              fullWidth
              name="username"
              value={userInfo.username}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              required
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              required
              label="Password"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              name="password"
              value={userInfo.password}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
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
            <Button variant="contained" color="primary" fullWidth type="submit">
              Sign Up
            </Button>
          </form>
          {/* {showPassword && (
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )} */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUpPage;
