"use client";

import React from "react";
import { Box, Container, Divider } from "@mui/material";
import FormSection from "./FormSection";
import QuickLinks from "./QuickLinks";

export default function ContactPage() {
  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh", pt: { xs: 15, md: 24 }, pb: 12 }}>
      <Container maxWidth="lg">
        {/* Form Section */}
        <FormSection />

        {/* Page Break / Divider */}
        <Divider sx={{ mt: 10, mb: 1, borderColor: "rgba(0,0,0,0.06)", borderBottomWidth: 1 }} />

        {/* Quick Links Section */}
        <QuickLinks />
      </Container>
    </Box>
  );
}
