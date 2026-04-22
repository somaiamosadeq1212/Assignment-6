import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold", mb: 1 }}>
        404
      </Typography>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Oops! Page not found
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        The page you are looking for doesn’t exist or no results found.
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </Button>
    </Box>
  );
}