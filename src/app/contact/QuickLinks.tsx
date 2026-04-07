"use client";

import React from "react";
import {
  Box,
  Typography,
  Stack,
  Link,
} from "@mui/material";
import { Poppins } from "next/font/google";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import EmailIcon from "@mui/icons-material/Email";
import ShareIcon from "@mui/icons-material/Share";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const iconCircleSx = {
  width: 70,
  height: 70,
  borderRadius: "50%",
  backgroundColor: "#F2F9F4",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#629474",
  flexShrink: 0,
};

const titleSx = {
  fontFamily: poppins.style.fontFamily,
  fontSize: "16px",
  fontWeight: 400,
  color: "#000",
  mb: 0.2,
};

const valueSx = {
  fontFamily: poppins.style.fontFamily,
  fontSize: { xs: "18px", md: "20px" },
  fontWeight: 600,
  color: "#000",
  lineHeight: 1.3,
};

const socialIconSx = {
  color: "#629474",
  fontSize: "26px",
  cursor: "pointer",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.2)",
  },
};

export default function QuickLinks() {
  const mapLat = 6.724624463657269;
  const mapLng = 80.02861070726175;

  return (
    <Box sx={{ width: "100%", pt: 4, pb: 10 }}>
      {/* Heading */}
      <Box sx={{ textAlign: "center", mb: 10 }}>
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontSize: { xs: "36px", md: "52px" },
            fontWeight: 600,
            color: "#000",
          }}
        >
          Quick Links
        </Typography>
      </Box>

      {/* Address */}
      <Box 
        sx={{ 
          maxWidth: "1100px", 
          mx: "auto", 
          mb: 10,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: { xs: 4, md: 8 },
          px: { xs: 2, sm: 0 }
        }}
      >
        {/* Hotline */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box sx={iconCircleSx}>
            <PhoneEnabledIcon sx={{ fontSize: "30px" }} />
          </Box>
          <Box>
            <Typography sx={titleSx}>Hotline</Typography>
            <Typography sx={valueSx}>077 779 6955</Typography>
          </Box>
        </Box>

        {/* Email */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box sx={iconCircleSx}>
            <EmailIcon sx={{ fontSize: "30px" }} />
          </Box>
          <Box>
            <Typography sx={titleSx}>Email</Typography>
            <Typography sx={valueSx}>info@senasuma.lk</Typography>
          </Box>
        </Box>

        {/* Social Media */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box sx={iconCircleSx}>
            <ShareIcon sx={{ fontSize: "28px" }} />
          </Box>
          <Box>
            <Typography sx={titleSx}>Social Media</Typography>
            <Stack direction="row" spacing={1.5} sx={{ mt: 0.5 }}>
              <Link href="#" target="_blank"><FacebookIcon sx={socialIconSx} /></Link>
              <Link href="#" target="_blank"><InstagramIcon sx={socialIconSx} /></Link>
              <Link href="#" target="_blank"><LinkedInIcon sx={socialIconSx} /></Link>
              <Link href="#" target="_blank"><XIcon sx={socialIconSx} /></Link>
              <Link href="#" target="_blank"><YouTubeIcon sx={socialIconSx} /></Link>
            </Stack>
          </Box>
        </Box>

        {/* Address */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box sx={iconCircleSx}>
            <LocationOnIcon sx={{ fontSize: "30px" }} />
          </Box>
          <Box>
            <Typography sx={titleSx}>Address</Typography>
            <Typography sx={valueSx}>
              Senasuma Polythene Center,<br />
              Panadura - Horana Rd,<br />
              Pokunuwita 12404
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Map Container */}
      <Box 
        sx={{ 
          width: "100%", 
          maxWidth: "1100px", 
          mx: "auto", 
          height: { xs: "350px", md: "520px" },
          borderRadius: "32px",
          overflow: "hidden",
          boxShadow: "0 15px 50px rgba(0,0,0,0.1)",
          position: "relative",
          backgroundColor: "#f0f0f0"
        }}
      >
        <iframe
          // Use the place name and full address to show the official business marker and title
          // Set t=k for satellite view
          src="https://maps.google.com/maps?q=Senasuma%20Polythene%20Center,%20Panadura%20-%20Horana%20Rd,%20Pokunuwita%2012404&t=k&z=17&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ 
            border: 0,
            filter: "contrast(1.2)" // Reduced filter to keep satellite colors natural but crisp
          }}
          allowFullScreen
          loading="lazy"
          title="Senasuma Polythene Center Location"
        />
      </Box>
    </Box>
  );
}
