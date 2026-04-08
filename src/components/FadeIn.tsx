"use client";

import { motion } from "framer-motion";
import React, { ReactNode, forwardRef } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  width?: string;
  style?: React.CSSProperties;
}

const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 40,
  className = "",
  width = "auto",
  style = {}
}, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      style={{ width, ...style }}
    >
      {children}
    </motion.div>
  );
});

FadeIn.displayName = "FadeIn";

export default FadeIn;
