"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { Poppins } from "next/font/google";
import FadeIn from "@/components/FadeIn";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const StatCounter: React.FC<StatItemProps> = ({ value, suffix, label, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(easedProgress * value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value]);

  return (
    <Box 
      ref={domRef}
      sx={{ 
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1
      }}
    >
      <Typography
        sx={{
          fontFamily: poppins.style.fontFamily,
          fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem", lg: "7rem" },
          fontWeight: 600,
          lineHeight: 1,
          color: "#1a1a1a",
          display: "flex",
          alignItems: "baseline",
        }}
      >
        {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
        <Box component="span" sx={{ fontSize: "0.85em", ml: 0.2 }}>
           {suffix}
        </Box>
      </Typography>
      <Typography
        sx={{
          fontFamily: poppins.style.fontFamily,
          fontSize: { xs: "12px", md: "14px", lg: "20px" },
          fontWeight: 400,
          color: "#666",
          textTransform: "capitalize",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

const StatsSection: React.FC = () => {
  const stats = [
    { value: 65, suffix: "%", label: "Recycled materials" },
    { value: 40, suffix: "%", label: "Energy reduction" },
    { value: 0, suffix: "", label: "Waste to landfill" },
    { value: 2.5, suffix: "Kt", label: "Recycled annually", decimals: 1 },
  ];

  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        backgroundColor: "#ffffff",
        width: "100%",
      }}
    >
      <FadeIn delay={0.1}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "1820px",
          mx: "auto",
          gap: { xs: 4, md: 2 },
        }}
      >
        {stats.map((stat, index) => (
          <Box
            key={index}
            sx={{
              flex: { 
                xs: "0 0 calc(50% - 16px)",
                md: "1"
              },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <StatCounter 
              value={stat.value} 
              suffix={stat.suffix} 
              label={stat.label} 
              decimals={stat.decimals}
            />
          </Box>
        ))}
      </Box>
      </FadeIn>
    </Box>
  );
};

export default StatsSection;
