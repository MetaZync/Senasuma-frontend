"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { Poppins } from "next/font/google";
import OrderButton from "../../components/Button";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface BlogCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  slug: string;
}

export default function BlogCard({ title, excerpt, imageUrl, slug }: BlogCardProps) {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: { xs: "24px", md: "32px" },
        padding: { xs: "12px", md: "16px" },
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
        display: "flex",
        flexDirection: "column",
        height: { xs: "460px", sm: "520px" },
        width: "100%",
        maxWidth: "320px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "200px", sm: "240px", md: "240px" },
          borderRadius: { xs: "16px", md: "24px" },
          overflow: "hidden",
          mb: { xs: 2, md: 3 },
        }}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, px: { xs: 0.5, md: 1 } }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            fontSize: { xs: "18px", sm: "20px", md: "20px" },
            color: "#000000",
            lineHeight: 1.3,
            mb: { xs: 1.5, md: 2 },
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            color: "#7a7a7a",
            fontSize: { xs: "13px", sm: "14px", md: "14px" },
            lineHeight: 1.6,
            mb: { xs: 2, md: 4 },
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flex: 1,
          }}
        >
          {excerpt}
        </Typography>

        <Box sx={{ mt: "auto", display: "flex", justifyContent: "flex-end" }}>
          <OrderButton href={`/blog/${slug}`}>
            Read more
          </OrderButton>
        </Box>
      </Box>
    </Box>
  );
}
