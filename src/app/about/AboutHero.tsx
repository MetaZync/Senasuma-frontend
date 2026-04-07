"use client";

import React, { useRef, useState } from "react";
import { Box, Typography, Container, Stack } from "@mui/material";
import { Poppins } from "next/font/google";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const MARQUEE_TEXT = "RECYCLE  :  REUSE  :  REDUCE  :  ";

export default function AboutHero() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(() => {
    if (!marqueeRef.current) return;
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 18,
      ease: "linear",
    });
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundImage: "url('/Assets/OverlayAbout.svg')",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        minHeight: "100vh",
        pt: { xs: 14, sm: 16, md: 45 },
        pb: { xs: 10, md: 14 },
        px: { xs: 2, md: 12 },
      }}
    >
      <Container maxWidth={false} sx={{ position: "relative", zIndex: 2 }}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 500,
            fontSize: { xs: "36px", sm: "52px", md: "72px", lg: "80px" },
            lineHeight: 1.08,
            letterSpacing: { xs: "-1px", md: "-2px" },
            fontFamily: poppins.style.fontFamily,
            color: "#000000",
            mb: { xs: 3, md: 2 },
            maxWidth: { xs: "100%", md: "75%", lg: "1250px" },
          }}
        >
          Leading Sri Lanka's Green Polythene Revolution
        </Typography>

        <Box
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "150px", sm: "260px", md: "300px", lg: "350px" },
            borderRadius: { xs: "20px", md: "36px", lg: "48px" },
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              filter: isHovered
                ? "blur(8px) brightness(0.6)"
                : "brightness(1)",
              transform: "scale(1.05)",
              transition: "filter 0.5s ease-in-out",
            }}
          >
              <Image
                src="/Assets/AboutHero.webp"
                alt="Senasuma Forest Landscape"
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
                priority
              />
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              width: "200%",
              display: "flex",
              alignItems: "center",
              zIndex: 2,
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.4s ease",
              pointerEvents: "none",
            }}
          >
            <Box
              ref={marqueeRef}
              sx={{ display: "flex", whiteSpace: "nowrap", willChange: "transform" }}
            >
              {[0, 1].map((copy) => (
                <Box key={copy} sx={{ display: "flex" }}>
                  {[...Array(6)].map((_, i) => (
                    <Typography
                      key={i}
                      sx={{
                        color: "#ffffff",
                        fontSize: {
                          xs: "80px",
                          sm: "100px",
                          md: "160px",
                          lg: "220px",
                        },
                        fontWeight: 400,
                        fontFamily: poppins.style.fontFamily,
                        letterSpacing: "6px",
                        px: 2,
                        lineHeight: 1,
                      }}
                    >
                      {MARQUEE_TEXT}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Stack
          direction={{ xs: "column", xl: "row" }}
          alignItems={{ xs: "stretch", xl: "flex-start" }}
          justifyContent="space-around"
          sx={{
            mt: { xs: 4, lg: "-100px", xl: "-90px" },
            position: "relative",
            zIndex: 3,
            gap: { xs: 5, xl: 0 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "column", lg: "row" },
              gap: { xs: 3, lg: 2 },
              width: { xs: "100%", lg: "auto" },
              height: { lg: "420px" },
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                background: "rgba(255,255,255,0.50)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.55)",
                borderRadius: { xs: "24px", md: "32px" },
                p: { xs: "24px", md: "32px 36px" },
                boxShadow: "0 16px 48px rgba(0,0,0,0.10)",
                width: { xs: "100%", sm: "80%", md: "400px" },
                alignSelf: { xs: "center", lg: "flex-start" },
                position: "relative",
                zIndex: 4,
                mx: { xs: "auto", lg: 0 },
              }}
            >
              <Typography
                sx={{
                  color: "#527f65",
                  fontSize: { xs: "56px", md: "84px" },
                  fontWeight: 700,
                  fontFamily: poppins.style.fontFamily,
                  lineHeight: 1,
                }}
              >
                65<span style={{ fontSize: "0.55em", fontWeight: 400 }}>%</span>
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  fontSize: { xs: "16px", md: "18px" },
                  fontWeight: 600,
                  fontFamily: poppins.style.fontFamily,
                  mt: 1,
                  mb: 1.5,
                }}
              >
                Recycled materials
              </Typography>
              <Typography
                sx={{
                  color: "#555",
                  fontSize: { xs: "12px", md: "13px" },
                  lineHeight: 1.65,
                  fontFamily: poppins.style.fontFamily,
                }}
              >
                At Senasuma, we're more than a manufacturer — we're stewards of Sri Lanka's environment, transforming plastic waste into reliable, high-quality products that businesses can trust.
              </Typography>
            </Box>

            <Box
              sx={{
                backgroundColor: "#629474",
                borderRadius: { xs: "24px", md: "32px" },
                p: { xs: "24px", md: "32px 36px" },
                width: { xs: "100%", sm: "80%", md: "400px" },
                alignSelf: { xs: "center", lg: "flex-end" },
                ml: { xs: 0, lg: "-60px" },
                position: "relative",
                zIndex: 3,
                mx: { xs: "auto", lg: 0 },
              }}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: { xs: "56px", md: "84px" },
                  fontWeight: 700,
                  fontFamily: poppins.style.fontFamily,
                  lineHeight: 1,
                }}
              >
                2.5<span style={{ fontSize: "0.45em", fontWeight: 400 }}>Kt</span>
              </Typography>
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: { xs: "16px", md: "18px" },
                  fontWeight: 600,
                  fontFamily: poppins.style.fontFamily,
                  mt: 1,
                  mb: 1.5,
                }}
              >
                Recycled annually
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.82)",
                  fontSize: { xs: "12px", md: "13px" },
                  lineHeight: 1.65,
                  fontFamily: poppins.style.fontFamily,
                }}
              >
                Every year, Senasuma rescues and recycles 2,500 tonnes of post-consumer plastic waste that would otherwise end up in landfills or oceans — the equivalent of over 120 million single-use plastic bags given a new life.
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              maxWidth: { xs: "100%", lg: "800px", xl: "580px" },
              pt: { xs: 0, xl: "140px" },
              pl: { xl: 6 },
              px: { xs: 2, sm: 0 },
              alignSelf: { xl: "flex-start" },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "#000",
                fontSize: { xs: "18px", sm: "22px", md: "26px", lg: "28px" },
                fontWeight: 600,
                fontFamily: poppins.style.fontFamily,
                lineHeight: 1.45,
                mb: 2.5,
              }}
            >
              Since 2003, Senasuma Polythene has evolved from a local initiative into a key player in Sri Lanka's recycling industry.
            </Typography>
            <Typography
              sx={{
                color: "#7a7a7a",
                fontSize: { xs: "14px", md: "15px" },
                fontFamily: poppins.style.fontFamily,
                lineHeight: 1.75,
                mb: 4,
              }}
            >
              Starting in Horana, we rapidly increased recycling capacity through the efforts of a committed team. By converting harmful waste into a national resource, we've laid the foundation for a sustainable, circular economy and created opportunities for community empowerment.
            </Typography>

            <Link href="/products" style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1.5,
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  borderRadius: "100px",
                  pl: { xs: 3, md: 4 },
                  pr: "6px",
                  height: { xs: "48px", md: "54px" },
                  fontFamily: poppins.style.fontFamily,
                  fontSize: { xs: "14px", md: "15px" },
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                  "&:hover": { backgroundColor: "#222222" },
                }}
              >
                Explore Products
                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    borderRadius: "50%",
                    width: { xs: 34, md: 40 },
                    height: { xs: 34, md: 40 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ArrowForwardIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
                </Box>
              </Box>
            </Link>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
