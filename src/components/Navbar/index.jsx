import React from "react";
import { HomeAppBar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <div>
      <HomeAppBar />
      <Box sx={{ marginTop: "86px" }}>
        <Outlet />
      </Box>
    </div>
  );
};

export default Layout;
