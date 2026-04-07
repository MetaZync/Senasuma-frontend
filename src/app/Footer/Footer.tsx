"use client";

import React from "react";
import { Box, Typography, Container, Grid, Link, Stack, IconButton, Divider } from "@mui/material";
import { Poppins } from "next/font/google";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import EmailIcon from "@mui/icons-material/Email";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        background: "linear-gradient(135deg, #7CA687 0%, #629474 100%)",
        color: "#fff",
        pt: { xs: 8, md: 10 },
        pb: 2,
        fontFamily: poppins.style.fontFamily,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 2, md: 4 }} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center", order: { xs: 1, md: 2 }, mb: { xs: 4, md: 0 } }}>
            <Box sx={{ width: "100%", maxWidth: { xs: "300px", md: "600px" } }}>
                <Image 
                  src="/Assets/FooterLogo.svg"
                  alt="Senasuma Polythene"
                  width={400}
                  height={220}
                  style={{ width: "100%", height: "auto" }}
                />
            </Box>
          </Grid>

          <Grid size={{ xs: 7, md: 4 }} sx={{ order: { xs: 2, md: 1 } }}>
            <Stack spacing={{ xs: 1.5, md: 2 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: { xs: 1, md: 2 } }}>
                <LocationOnIcon sx={{ mt: 0.5, fontSize: { xs: "16px", md: "20px" } }} />
                <Typography sx={{ fontSize: { xs: "11px", md: "16px" }, fontWeight: 400, opacity: 0.9 }}>
                  Senasuma Polythene Center,<br />
                  Panadura road, Henegama,<br />
                  Pokunuwita, Horana
                </Typography>
              </Box>
              
              <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", width: "100%" }} />

              <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}>
                <PhoneEnabledIcon sx={{ fontSize: { xs: "16px", md: "20px" } }} />
                <Typography sx={{ fontSize: { xs: "11px", md: "16px" }, fontWeight: 400, opacity: 0.9 }}>
                  077 779 6955
                </Typography>
              </Box>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", width: "100%" }} />

              <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}>
                <EmailIcon sx={{ fontSize: { xs: "16px", md: "20px" } }} />
                <Typography sx={{ fontSize: { xs: "11px", md: "16px" }, fontWeight: 400, opacity: 0.9 }}>
                  info@senasuma.lk
                </Typography>
              </Box>

              <Box sx={{ pt: 1 }}>
                 <Box 
                   sx={{ 
                     display: "flex", 
                     alignItems: "center", 
                     bgcolor: "#000", 
                     borderRadius: "50px", 
                     width: "fit-content", 
                     p: { xs: "2px 2px 2px 12px", md: "4px 4px 4px 18px" },
                     gap: 1,
                     cursor: "pointer",
                     transition: "transform 0.2s",
                     "&:hover": { transform: "scale(1.05)" }
                   }}
                 >
                   <Typography sx={{ fontSize: { xs: "10px", md: "15px" }, fontWeight: 500 }}>Send an Inquiry</Typography>
                   <Box sx={{ bgcolor: "#fff", color: "#000", borderRadius: "50%", width: { xs: 20, md: 28 }, height: { xs: 20, md: 28 }, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <PhoneEnabledIcon sx={{ fontSize: { xs: "10px", md: "14px" }, transform: "rotate(-45deg)" }} />
                   </Box>
                 </Box>
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 5, md: 4 }} sx={{ display: "flex", justifyContent: { xs: "flex-end", md: "flex-end" }, order: { xs: 3, md: 3 } }}>
            <Stack spacing={1} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontSize: { xs: "18px", md: "24px" }, fontWeight: 500, mb: 1 }}>Pages</Typography>
              {["Home", "Products", "About", "Contact", "Sustainability", "Blog"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  underline="none"
                  sx={{
                    color: "#fff",
                    fontSize: { xs: "11px", md: "14px" },
                    fontWeight: 400,
                    opacity: 0.85,
                    transition: "opacity 0.2s",
                    "&:hover": { opacity: 1 }
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Box 
          sx={{ 
            pt: 4, 
            mt: 4, 
            borderTop: "1px solid rgba(255,255,255,0.1)", 
            display: "flex", 
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1
          }}
        >
          <Typography sx={{ fontSize: { xs: "10px", md: "14px" }, fontWeight: 300, opacity: 0.7 }}>
            Copyrights SENASUMA &copy; 2025. All rights reserved
          </Typography>
          <Typography sx={{ fontSize: { xs: "10px", md: "14px" }, fontWeight: 300, opacity: 0.7 }}>
            Developed by MetaZync
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
