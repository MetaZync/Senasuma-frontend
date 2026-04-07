"use client";

import React, { useState, useEffect } from "react";
import { Fab, Zoom, useScrollTrigger } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={visible}>
      <Fab
        onClick={scrollToTop}
        size="medium"
        aria-label="scroll back to top"
        sx={{
          position: "fixed",
          bottom: { xs: 24, md: 40 },
          right: { xs: 24, md: 40 },
          backgroundColor: "rgba(255, 255, 255, 0.1) !important",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: "#000000ff",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.6) !important",
            transform: "translateY(-5px) scale(1.05)",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
          },
          zIndex: 2000,
        }}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: "32px" }} />
      </Fab>
    </Zoom>
  );
}
