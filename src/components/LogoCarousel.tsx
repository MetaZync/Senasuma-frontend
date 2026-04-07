"use client";

import React from "react";
import styles from "./LogoCarousel.module.css";
import { Box } from "@mui/material";

const logos = [
  { name: "Siddhalepa", src: "/Assets/companyLogo1.webp" },
  { name: "Nolimit", src: "/Assets/companyLogo2.webp" },
  { name: "Lakpa", src: "/Assets/companyLogo3.webp" },
  { name: "DSI", src: "/Assets/companyLogo4.webp" },
  { name: "Ceylon Beverage", src: "/Assets/companyLogo5.webp" },
  { name: "Ferentina", src: "/Assets/companyLogo6.webp" },
  { name: "Arpico", src: "/Assets/companyLogo7.webp" },
  { name: "DCSL", src: "/Assets/companyLogo8.webp" },
  { name: "Coca Cola", src: "/Assets/companyLogo9.webp" },
];

const LogoCarousel: React.FC = () => {
  const displayLogos = [...logos, ...logos, ...logos];

  return (
    <Box className={styles.carouselContainer}>
      <div className={styles.scrollTrack}>
        {displayLogos.map((logo, index) => (
          <div key={`${logo.name}-${index}`} className={styles.logoItem}>
            <img
              src={logo.src}
              alt={logo.name}
              className={styles.logoImage}
            />
          </div>
        ))}
      </div>
    </Box>
  );
};

export default LogoCarousel;
