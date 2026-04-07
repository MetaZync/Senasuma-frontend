"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const RecognizedSection: React.FC = () => {
  const awards = [
    { src: "/Assets/RecognizedInnovations1.svg", alt: "Presidential Award 2004" },
    { src: "/Assets/RecognizedInnovations2.svg", alt: "No1 Recycling Island Award 2018" },
    { src: "/Assets/RecognizedInnovations3.svg", alt: "Presidential Award 2015" },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10, lg: 20 },
        px: { xs: 2, sm: 4, lg: 8 },
        backgroundColor: "#ffffff",
        textAlign: "center",
        maxWidth: "1820px",
        m: "auto",
        width: "100%",
      }}
    >
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          mb: { xs: 3, md: 5 } 
        }}
      >
        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            gap: { xs: 1.5, sm: 2 },
            flexWrap: "nowrap"
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: { xs: "28px", sm: "45px", md: "52px", lg: "65px" },
              fontWeight: 500,
              color: "#1a1a1a",
              lineHeight: 1.2,
            }}
          >
            Recognized
          </Typography>
          <Box
            sx={{
              width: { xs: "32px", sm: "48px", md: "55px", lg: "68px" },
              height: { xs: "32px", sm: "48px", md: "55px", lg: "68px" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Image
              src="/Assets/GreenCup.svg"
              alt="Green Cup Icon"
              width={68}
              height={68}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <Typography
            component="h2"
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: { xs: "28px", sm: "45px", md: "52px", lg: "65px" },
              fontWeight: 500,
              color: "#1a1a1a",
              lineHeight: 1.2,
            }}
          >
            for
          </Typography>
        </Box>
        <Typography
          component="h2"
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontSize: { xs: "28px", sm: "45px", md: "52px", lg: "65px" },
            fontWeight: 500,
            color: "#1a1a1a",
            lineHeight: 1.2,
            mt: { xs: -0.5, md: -1 },
          }}
        >
          Innovation
        </Typography>
      </Box>

      <Typography
        sx={{
          fontFamily: poppins.style.fontFamily,
          fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "18px" },
          fontWeight: 400,
          color: "#1a1a1acc",
          maxWidth: { xs: "100%", sm: "90%", md: "850px" },
          mx: "auto",
          mb: { xs: 2, md: 10, lg: 2 },
          lineHeight: 1.6,
          px: { xs: 2, sm: 0 },
        }}
      >
        From environmental responsibility awards to national manufacturing excellence recognitions, 
        Senasuma has consistently been acknowledged for sustainable production practices and ethical 
        industrial operations.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 1, sm: 4, md: 8, lg: 12 },
          flexWrap: "wrap",
          px: { xs: 0, sm: 0 },
        }}
      >
        {awards.map((award, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: "40%", sm: "28%", md: "300px", lg: "350px" },
              maxWidth: { xs: "150px", sm: "none" },
              aspectRatio: "350 / 220",
              position: "relative",
              transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              "&:hover": {
                transform: "scale(1.08)",
              },
            }}
          >
            <Image
              src={award.src}
              alt={award.alt}
              fill
              sizes="(max-width: 600px) 150px, (max-width: 900px) 300px, 350px"
              style={{ objectFit: "contain" }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RecognizedSection;
