import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getImgUrl } from "../utils/path";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
// import image from "../assets/background/bg.jpg";

export const Login = () => {
  const { login } = useAuth();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  }
  let navigate = useNavigate();
  const handleLogin = async () => {
    let response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    });

    if (response.ok) {
      // If login is successful, parse the response JSON
      const userData = await response.json();
      console.log("userData", userData);

      // Store user data in localStorage
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("token", JSON.stringify(userData.token));
      // alert("Login successful!");
      login();
      navigate("/", { replace: true });
      console.log("Login successful!");
    } else {
      alert("Login failed. Please check your credentials.");
      console.error("Login failed. Please check your credentials.");
    }

    // localStorage.setItem('userData', res.)
  };
  console.log(loginForm);
  return (
    <Box
      height="98vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems=" center"
      sx={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${getImgUrl("/background/bg.jpg")})`,
      }}
    >
      <Paper p={2} sx={{ width: "40vh" }}>
        <Stack m={2} gap={1} justifyContent={"center"} alignItems={"center"}>
          <Typography mt={3} mb={1} variant="h5" component={"h1"}>
            Login
          </Typography>
          <TextField
            size="small"
            label="Username"
            name="username"
            value={loginForm.username}
            onChange={handleChange}
          />
          <TextField
            size="small"
            label="Password"
            name="password"
            type="password"
            value={loginForm.password}
            onChange={handleChange}
          />
          <Button
            sx={{ display: "block", mt: 2, mb: 2 }}
            variant="outlined"
            size="small"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button size="small" sx={{ textTransform: "none" }}>
            Forgot your Password?
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};
