"use client";

import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
  Stack,
  Divider,
} from "@mui/material";
import NextLink from "next/link";
import { Poppins } from "next/font/google";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import EmailIcon from "@mui/icons-material/Email";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const pages = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Sustainability", path: "/sustainability" },
  { name: "Blog", path: "/blog" },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        background: "linear-gradient(135deg, #8DC38B 0%, #527F65 100%)",
        color: "#fff",
        pt: { xs: 8, md: 10 },
        pb: 2,
        fontFamily: poppins.style.fontFamily,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 2, md: 4 }} sx={{ mb: 6 }}>
          
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              order: { xs: 1, md: 2 },
              mb: { xs: 4, md: 0 },
            }}
          >
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
              
              <Box
                component="a"
                target="_blank"
                href="https://www.google.com/maps/search/?api=1&query=Senasuma+Polythene+Center+Panadura+road+Henegama+Pokunuwita+Horana"
                sx={{ display: "flex", alignItems: "flex-start", gap: { xs: 1, md: 2 }, textDecoration: "none", color: "inherit" }}
              >
                <LocationOnIcon sx={{ mt: 0.5, fontSize: { xs: "16px", md: "20px" } }} />
                <Typography sx={{ fontSize: { xs: "11px", md: "16px" }, opacity: 0.9 }}>
                  Senasuma Polythene Center,<br />
                  Panadura road, Henegama,<br />
                  Pokunuwita, Horana
                </Typography>
              </Box>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

              <Box
                component="a"
                href="https://wa.me/94777796955"
                target="_blank"
                sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 }, textDecoration: "none", color: "inherit" }}
              >
                <PhoneEnabledIcon sx={{ fontSize: { xs: "16px", md: "20px" } }} />
                <Typography sx={{ fontSize: { xs: "11px", md: "16px" }, opacity: 0.9 }}>
                  077 779 6955
                </Typography>
              </Box>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

              <Box
                component="a"
                href="mailto:info@senasuma.lk"
                sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 }, textDecoration: "none", color: "inherit" }}
              >
                <EmailIcon sx={{ fontSize: { xs: "16px", md: "20px" } }} />
                <Typography sx={{ fontSize: { xs: "11px", md: "16px" }, opacity: 0.9 }}>
                  info@senasuma.lk
                </Typography>
              </Box>

              <Box sx={{ pt: 1 }}>
                <Box
                  component={NextLink}
                  href="/contact"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "#000",
                    borderRadius: "50px",
                    width: "fit-content",
                    p: { xs: "2px 2px 2px 12px", md: "4px 4px 4px 18px" },
                    gap: 1,
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <Typography sx={{ fontSize: { xs: "10px", md: "15px" }, color: "#fff" }}>
                    Send an Inquiry
                  </Typography>
                  <Box sx={{ bgcolor: "#fff", borderRadius: "50%", width: { xs: 20, md: 28 }, height: { xs: 20, md: 28 }, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <PhoneEnabledIcon sx={{ fontSize: { xs: "10px", md: "14px" }, transform: "rotate(-45deg)" }} />
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 5, md: 4 }} sx={{ display: "flex", justifyContent: "flex-end", order: { xs: 3, md: 3 } }}>
            <Stack spacing={1} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontSize: { xs: "18px", md: "24px" }, mb: 1 }}>
                Pages
              </Typography>

              {pages.map((item) => (
                <Link
                  key={item.name}
                  component={NextLink}
                  href={item.path}
                  underline="none"
                  sx={{
                    color: "#fff",
                    fontSize: { xs: "11px", md: "14px" },
                    opacity: 0.85,
                    "&:hover": { opacity: 1 },
                  }}
                >
                  {item.name}
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
            gap: 1,
          }}
        >
          <Typography sx={{ fontSize: { xs: "10px", md: "14px" }, opacity: 0.7 }}>
            © 2025 SENASUMA. All rights reserved
          </Typography>
          <Typography sx={{ fontSize: { xs: "10px", md: "14px" }, opacity: 0.7 }}>
            Developed by MetaZync
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;