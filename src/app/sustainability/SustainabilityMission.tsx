"use client";

import { Box, Typography, Container } from "@mui/material";
import Image from "next/image";
import { Poppins } from "next/font/google";
import OrderButton from "../../components/Button";
import GreenSrilanka from "../../../public/Assets/GreenSrilanka.webp";
import FadeIn from "@/components/FadeIn";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function SustainabilityMission() {
  return (
    <Box sx={{ py: { xs: 8, md: 16 }, backgroundColor: "#ffffff", overflow: "hidden" }}>
      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6, lg: 10 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 6, md: 5 },
          }}
        >
          <Box
            component={FadeIn} delay={0.1}
            sx={{
              flex: 1,
              display: {xs: "none", md: "flex"},
              justifyContent: "center",
              position: "relative",
              width: "100%",
              maxWidth: { xs: "400px", md: "600px" },
            }}
          >
            <Image
              src={GreenSrilanka}
              alt="Green Sri Lanka"
              style={{ width: "85%", height: "auto", objectFit: "contain" }}
            />
          </Box>

          <Box component={FadeIn} delay={0.2} sx={{ flex: 1 }}>
            <Box sx={{ maxWidth: "700px" }}>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 500,
                  fontSize: { xs: "24px", md: "28px", lg: "32px" },
                  color: "#1a1a1a",
                  lineHeight: 1.4,
                  mb: { xs: 3, md: 4 },
                  letterSpacing: "-0.5px",
                }}
              >
                Our mission is to lead Sri Lanka's polythene industry into a future where packaging is strong, affordable, and environmentally responsible.
              </Typography>

              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  color: "#7a7a7a",
                  fontSize: { xs: "16px", md: "17px" },
                  lineHeight: 1.6,
                  mb: { xs: 4, md: 5 },
                  fontWeight: 400,
                }}
              >
                At Senasuma, sustainability isn't a trend—it's the foundation of everything we do. From responsible material sourcing to energy-efficient production, we are redefining what it means to create polythene products in a world that demands conscious change.
              </Typography>

              <OrderButton href="/products">
                Explore Products
              </OrderButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
