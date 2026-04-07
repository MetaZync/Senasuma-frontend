"use client";

import React, { useState, useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import OrderButton from "@/components/Button";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PremiumPolytheneSection from "@/app/PremiumPolytheneSection";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const products = [
  {
    id: 1,
    name: "Polythene Bags",
    description: "Eco-friendly, durable bags designed for retail, industrial, and commercial use.",
    image: "/Assets/Carousel1.webp",
  },
  {
    id: 2,
    name: "Garbage Bags",
    description: "Heavy-duty waste management solutions for residential and industrial applications.",
    image: "/Assets/Carousel2.webp",
  },
  {
    id: 3,
    name: "Industrial Packing",
    description: "Superior protection for goods during transit with our high-grade industrial wrap.",
    image: "/Assets/Carousel3.webp",
  },
  {
    id: 4,
    name: "Retail Packaging",
    description: "Premium branded packaging that enhances your product presentation and appeal.",
    image: "/Assets/Carousel4.webp",
  },
  {
    id: 5,
    name: "Custom Solutions",
    description: "Tailored manufacturing solutions to meet your unique business requirements.",
    image: "/Assets/Carousel5.webp",
  },
];

const PopularProducts: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useGSAP(() => {
    updateCarousel();
  }, { scope: carouselRef, dependencies: [activeIndex] });

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  const updateCarousel = () => {
    const cards = gsap.utils.toArray(".product-card") as HTMLElement[];
    const len = products.length;

    cards.forEach((card, i) => {
      let diff = i - activeIndex;

      if (diff > Math.floor(len / 2)) diff -= len;
      if (diff < -Math.floor(len / 2)) diff += len;

      const absDiff = Math.abs(diff);

      const xPercent = diff * 100;
      const scale = 1 - absDiff * 0.18;
      const zIndex = 10 - absDiff;
      const opacity = 1 - absDiff * 0;

      gsap.to(card, {
        xPercent,
        scale,
        zIndex,
        opacity,
        filter: "none",
        duration: 1,
        ease: "power2.out",
      });
    });
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: 'url("/Assets/PopularProductBackgroundOverlay.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: { xs: 8, md: 10 },
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1820px",
          px: { xs: 2, lg: 8 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 20,
          gap: 3,
          mb: { xs: 4, md: 0 },
          "@media (min-width: 1420px)": {
            flexDirection: "row",
            position: "absolute",
            top: "10px",
            gap: 0
          }
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: { xs: "1.8rem", md: "3rem", lg: "4rem" },
              fontWeight: 500,
              color: "#1a1a1a",
            }}
          >
            Our
          </Typography>
          <Box sx={{ width: { xs: "32px", md: "48px", lg: "58px" } }}>
            <Image
              src="/Assets/GreenBag.svg"
              alt="Bag Icon"
              width={58}
              height={58}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: { xs: "1.8rem", md: "3rem", lg: "4rem" },
              fontWeight: 500,
              color: "#1a1a1a",
            }}
          >
            Popular
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: { xs: "1.8rem", md: "3rem", lg: "4rem" },
              fontWeight: 500,
              color: "#1a1a1a",
            }}
          >
            Products
          </Typography>
        </Box>

        <Box sx={{
          position: { xs: "relative", lg: "absolute" },
          right: { lg: "64px" },
          mt: { xs: 1, lg: 0 }
        }}>
          <OrderButton
            onClick={() => { }}
          >
            See all Products
          </OrderButton>
        </Box>
      </Box>

      <Box
        ref={carouselRef}
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "300px", md: "450px", lg: "550px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "1000px",
          mt: { xs: 0, md: 0 },
        }}
      >
        {products.map((product, index) => (
          <Box
            key={product.id}
            className="product-card"
            sx={{
              position: "absolute",
              width: { xs: "200px", md: "300px", lg: "330px" },
              height: { xs: "280px", md: "420px", lg: "450px" },
              borderRadius: "40px",
              overflow: "clip",
              backgroundColor: "#e0f2f1",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 200px, (max-width: 1200px) 300px, 330px"
              style={{ objectFit: "cover" }}
            />
          </Box>
        ))}

        <Box
          sx={{
            position: "absolute",
            bottom: { xs: "-50px", md: "-40px" },
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: { xs: "140px", md: 40 },
            zIndex: 30,
            width: { xs: "100%", md: "600px" },
            justifyContent: { xs: "center", md: "space-between" },
            px: 4
          }}
        >
          <IconButton
            onClick={handlePrev}
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              "&:hover": { backgroundColor: "#333" },
              width: "50px",
              height: "50px"
            }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: "20px" }} />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              "&:hover": { backgroundColor: "#333" },
              width: "50px",
              height: "50px"
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          textAlign: "center",
          mt: { xs: 8, md: 5 },
          px: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          maxWidth: "700px",
          zIndex: 20
        }}
      >
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontSize: { xs: "22px", md: "32px", lg: "42px" },
            fontWeight: 500,
            color: "#1a1a1a",
          }}
        >
          {products[activeIndex].name}
        </Typography>
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontSize: { xs: "11px", md: "12px", lg: "13px" },
            fontWeight: 400,
            color: "#666",
            lineHeight: 1.6,
          }}
        >
          {products[activeIndex].description}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <OrderButton
            onClick={() => { }}
            icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 2C3.66667 2 3.4 2.13333 3.2 2.4L2.33333 3.46667C2.13333 3.73333 2 4 2 4.33333V12.6667C2 13.4 2.6 14 3.33333 14H8.86667C8.73333 13.6 8.66667 13.1333 8.66667 12.6667C8.66667 10.4667 10.4667 8.66667 12.6667 8.66667C13.1333 8.66667 13.6 8.73333 14 8.86667V4.33333C14 4 13.8667 3.73333 13.6667 3.46667L12.7333 2.33333C12.6 2.13333 12.3333 2 12 2H4ZM3.93333 2.66667H11.9333L12.5333 3.33333H3.4L3.93333 2.66667ZM4 10H8V12H4V10ZM14.2 10.5333L11.8 12.9333L10.7333 11.8667L10 12.6667L11.8667 14.6667L15.0667 11.4667L14.2 10.5333Z" fill="black" />
            </svg>
            }
          >
            Order Now
          </OrderButton>
        </Box>
      </Box>
      <PremiumPolytheneSection />
    </Box>
  );
};

export default PopularProducts;
