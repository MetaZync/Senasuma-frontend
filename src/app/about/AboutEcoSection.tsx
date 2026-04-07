"use client";

import { Box, Typography, Stack } from "@mui/material";
import { Poppins } from "next/font/google";
import Image from "next/image";
import OrderButton from "@/components/Button";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function AboutEcoSection() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#ffffff",
        py: { xs: 10, md: 15 },
        px: { xs: 3, sm: 6, md: 8, lg: 12, xl: 12 },
        overflow: "hidden",
      }}
    >
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={{ xs: 8, lg: 10 }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box sx={{ flex: 1, maxWidth: { xs: "100%", lg: "550px" } }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 600,
              fontSize: { xs: "32px", sm: "40px", md: "48px", lg: "56px" },
              lineHeight: 1.1,
              color: "#0a0a0a",
              mb: 4,
            }}
          >
            H1 Eco-Friendly Polythene Products, Built for Business
          </Typography>
          
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 400,
              fontSize: { xs: "16px", md: "18px" },
              lineHeight: 1.6,
              color: "#666666",
              mb: 6,
            }}
          >
            We collect, clean, and process discarded plastic and polythene into
            high-quality, reusable raw materials. Our recycled products help
            industries reduce waste, while our services promote eco-friendly
            production across sectors.
          </Typography>

          <OrderButton href="/products">
            Explore Products
          </OrderButton>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            gap: { xs: 2, sm: 3 },
            width: "100%",
            justifyContent: { xs: "center", lg: "end" },
            alignItems: "flex-start",
          }}
        >
          <Stack
            spacing={{ xs: 2, sm: 3 }}
            sx={{
              mt: { xs: 4, lg: 12 },
              width: { xs: "45%", sm: "40%" },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "1.3/1",
                borderRadius: { xs: "16px", md: "24px" },
                overflow: "hidden",
              }}
            >
              <Image
                src="/Assets/AboutEcoTile1.webp"
                alt="Eco-friendly bottles"
                fill
                sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 20vw"
                style={{ objectFit: "cover" }}
              />
            </Box>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "1.3/1",
                borderRadius: { xs: "16px", md: "24px" },
                overflow: "hidden",
              }}
            >
              <Image
                src="/Assets/AboutEcoTile2.webp"
                alt="Packaged vegetables"
                fill
                sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 20vw"
                style={{ objectFit: "cover" }}
              />
            </Box>
          </Stack>

          <Stack
            spacing={{ xs: 2, sm: 3 }}
            sx={{
              width: { xs: "45%", sm: "40%" },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "1.3/1",
                borderRadius: { xs: "16px", md: "24px" },
                overflow: "hidden",
              }}
            >
              <Image
                src="/Assets/AboutEcoTile3.webp"
                alt="Plastic sorting process"
                fill
                sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 20vw"
                style={{ objectFit: "cover" }}
              />
            </Box>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "1.3/1",
                borderRadius: { xs: "16px", md: "24px" },
                overflow: "hidden",
              }}
            >
              <Image
                src="/Assets/AboutEcoTile4.webp"
                alt="Polythene rolls"
                fill
                sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 20vw"
                style={{ objectFit: "cover" }}
              />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
