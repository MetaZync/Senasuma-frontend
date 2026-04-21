"use client";

import { Box, Typography, Button, Stack } from "@mui/material";
import RecyclingIcon from "@mui/icons-material/Recycling";
import { Poppins } from "next/font/google";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

import Link from "next/link";

interface ProductCardProps {
  id: number;
  image?: string;
  tagline?: string;
  title?: string;
  mainDescription?: string;
  short_description?: string;
}

export default function ProductCard({
  id,
  image = "/Assets/BagTemp.webp",
  tagline = "100% Recycled",
  title = "Polythene Bags",
  mainDescription = "Our Premium Polythene Bags are designed for both everyday use and industrial-level applications.",
  short_description,
}: ProductCardProps) {
  const getCardDescription = (text: string) => {
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length <= 20) return text;
    return words.slice(0, 20).join(" ") + "...";
  };
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: { xs: "30px", md: "40px" },
        padding: { xs: "10px", md: "16px" },
        boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.05)",
        width: "100%",
        maxWidth: "350px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: { xs: "8px", md: "12px" },
        fontFamily: poppins.style.fontFamily,
        transition: "box-shadow 0.1s ease-in-out",
        "&:hover": {
          boxShadow: "0px 25px 50px rgba(0, 0, 0, 0.08)",
          "& .product-image": {
            transform: "scale(1.1)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "1.3/1",
          borderRadius: { xs: "20px", md: "30px" },

          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "12px",
            left: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.27)",
            backdropFilter: "blur(4px)",
            borderRadius: "100px",
            padding: "3px 8px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            zIndex: 1,
            border: "none",
          }}
        >
          <RecyclingIcon sx={{ fontSize: 16, color: "#ffffff" }} />
          <Typography
            sx={{
              fontSize: { xs: "12px", md: "14px" },
              fontWeight: 600,
              color: "#ffffff",
              fontFamily: poppins.style.fontFamily,
              letterSpacing: "0.5px",
            }}
          >
            {tagline}
          </Typography>
        </Box>

        <Box
          className="product-image"
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            transition: "transform 0.5s ease-in-out",
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 600px) 50vw, (max-width: 1200px) 33vw, 350px"
            style={{ objectFit: "cover" }}
            priority
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", px: { xs: "4px", md: "8px" }, flexGrow: 1 }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "16px", sm: "18px", md: "22px" },
            fontWeight: 600,
            color: "#000000",
            fontFamily: poppins.style.fontFamily,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "11px", md: "14px" },
            color: "#7a7a7a",
            lineHeight: 1.5,
            fontFamily: poppins.style.fontFamily,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            height: { xs: "48px", md: "63px" }, // Fixed height for 3 lines
          }}
        >
          {getCardDescription(short_description || mainDescription)}
        </Typography>
      </Box>

      <Stack
        direction="row"
        sx={{
          mt: "auto",
          pt: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: { xs: "space-around", sm: "space-around", md: "space-between" },
          px: { xs: "2px", md: "4px" },
          pb: "2px",
          gap: { xs: 1, md: 1.5 },
          flexWrap: "wrap",
        }}
      >
        <Link href={`/products/${id}`} style={{ textDecoration: "none" }}>
          <Button
            sx={{
              backgroundColor: "#f5f5f5",
              color: "#000000",
              borderRadius: "100px",
              padding: { xs: "4px 10px", sm: "6px 14px", md: "8px 20px" },
              textTransform: "none",
              fontSize: { xs: "10px", sm: "11px", md: "13px" },
              fontWeight: 500,
              fontFamily: poppins.style.fontFamily,
              minWidth: "fit-content",
              flexShrink: 1,
              "&:hover": {
                backgroundColor: "#eeeeee",
              },
            }}
          >
            Read more
          </Button>
        </Link>
        <Link href={`/products/${id}/place-order`} style={{ textDecoration: "none" }}>
          <Button
            endIcon={
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  borderRadius: "50%",
                  width: { xs: 28, sm: 32, md: 35 },
                  height: { xs: 28, sm: 32, md: 35 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ArrowForwardIcon sx={{ fontSize: { xs: 14, sm: 16, md: 20 } }} />
              </Box>
            }
            sx={{
              backgroundColor: "#000000",
              color: "#ffffff",
              borderRadius: "128px",
              paddingLeft: { xs: "12px", sm: "16px", md: "20px" },
              paddingRight: "4px",
              fontFamily: poppins.style.fontFamily,
              fontSize: { xs: "11px", sm: "12px", md: "14px" },
              fontWeight: 500,
              textTransform: "none",
              boxShadow: "none",
              height: { xs: "32px", sm: "35px", md: "40px" },
              minWidth: { xs: "90px", sm: "110px", md: "130px" },
              width: "fit-content",
              alignItems: "center",
              justifyContent: "space-between",
              gap: { xs: "6px", sm: "8px", md: "16px" },
              flexShrink: 0,

              "&:hover": {
                backgroundColor: "#1a1a1a",
                boxShadow: "none",
              },

              "& .MuiButton-endIcon": {
                marginLeft: 0,
                marginRight: 0,
              },
            }}
          >
            Buy Now
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}
