"use client";

import React from "react";
import { Box, Typography, Container, Stack } from "@mui/material";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { commonUsagesMap } from "./CommonUsageData";
import FadeIn from "@/components/FadeIn";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface UsageCardProps {
  name: string;
}

const UsageCard: React.FC<UsageCardProps> = ({ name }) => {
  const imageSrc = commonUsagesMap[name] || "/Assets/commonusage1.webp";
  const displayName = name.replace(/\s\d+$/, "");

  return (
    <Box
      sx={{
        width: { 
          xs: "calc(33.333% - 11px)",
          sm: "calc(25% - 18px)",
          md: "calc(25% - 24px)",
          lg: "280px"
        },
        borderRadius: { xs: "16px", md: "30px" },
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        aspectRatio: "1 / 1.2",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Image
        src={imageSrc}
        alt={displayName}
        fill
        sizes="(max-width: 600px) 100vw, 300px"
        style={{ objectFit: "cover", zIndex: 0 }}
        priority
      />

      <Box
        sx={{
          width: "100%",
          backgroundColor: "#000000",
          py: { xs: 1, md: 2 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            color: "#ffffff",
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            fontSize: { xs: "10px", sm: "14px", md: "15px" },
            textAlign: "center",
            px: { xs: 0.5, md: 0 },
            lineHeight: 1.2
          }}
        >
          {displayName}
        </Typography>
      </Box>
    </Box>
  );
};

interface CommonUsagesProps {
  usages: string[];
}

export default function CommonUsages({ usages }: CommonUsagesProps) {
  if (!usages || usages.length === 0) return null;

  return (
    <Box sx={{ backgroundColor: "#ffffff", py: 10 }}>
      <Container maxWidth="xl">
        <Typography
          component={FadeIn} delay={0.1}
          variant="h2"
          sx={{
            textAlign: "center",
            fontFamily: poppins.style.fontFamily,
            fontSize: { xs: "32px", md: "48px" },
            fontWeight: 500,
            color: "#000000",
            mb: 8,
          }}
        >
          Common Usages
        </Typography>

        <Stack
          component={FadeIn} delay={0.2}
          direction="row"
          useFlexGap
          sx={{
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {usages.map((usage, index) => (
            <UsageCard key={index} name={usage} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
