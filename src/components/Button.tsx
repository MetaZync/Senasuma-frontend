"use client";

import { Box, Button, ButtonProps } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ReactNode } from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface OrderButtonProps extends Omit<ButtonProps, "onClick" | "href"> {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  icon?: ReactNode;
  hideOnMobile?: boolean;
  iconBg?: string;
  iconColor?: string;
}

export default function OrderButton({
  children,
  onClick,
  href,
  icon = <ArrowForwardIcon sx={{ fontSize: 20 }} />,
  hideOnMobile = false,
  iconBg = "#ffffff",
  iconColor = "#000000",
  ...props
}: OrderButtonProps) {
  return (
    <Button
      variant="contained"
      disableElevation
      href={href}
      onClick={onClick}
      sx={{
        backgroundColor: "#000000 !important",
        color: "#ffffff !important",
        borderRadius: "128px",
        paddingLeft: "34px",
        fontFamily: poppins.style.fontFamily,
        fontSize: { xs: "14px", md: "18px" },
        fontWeight: 500,
        textTransform: "none",
        boxShadow: "none",
        height: "52px",
        minWidth: "220px",
        width: "fit-content",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        display: hideOnMobile ? { xs: "none", md: "flex" } : "flex",

        "&:hover": {
          backgroundColor: "#1a1a1a !important",
          boxShadow: "none",
        },

        "& .MuiButton-endIcon": {
          marginLeft: 0,
          marginRight: 0,
        },

        ...props.sx,
      }}
      endIcon={
        <Box
          sx={{
            backgroundColor: iconBg,
            color: iconColor,
            borderRadius: "50%",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            mr: -1
          }}
        >
          {icon}
        </Box>
      }
      {...props}
    >
      {children}
    </Button>
  );
}
