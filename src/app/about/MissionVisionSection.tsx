"use client";

import { Box, Typography, Stack, Container } from "@mui/material";
import { Poppins } from "next/font/google";
import OrderButton from "@/components/Button";
import LogoCarousel from "@/components/LogoCarousel";
import FadeIn from "@/components/FadeIn";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function MissionVisionSection() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        py: { xs: 8, md: 10 },
        px: { xs: 2, md: 4, lg: 12 },
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 0, sm: 2 } }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            width: "100%",
            justifyContent: "center",
          }}
        >
          {/* Card 1: Collaborations */}
          <Box
            component={FadeIn} delay={0.1}
            sx={{
              flex: { xs: "1 1 100%", lg: "1.8 1 0" },
              width: "100%",
              backgroundColor: "#000000",
              backgroundImage: "url(/Assets/CardOverlay.svg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "40px",
              p: { xs: 4, md: 6 },
              pb: { xs: 4, md: 0 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: { xs: "500px", md: "450px", lg: "550px" },
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  color: "#ffffff",
                  fontSize: { xs: "2.5rem", sm: "3.2rem", md: "clamp(2.8rem, 5vw, 4rem)" },
                  fontWeight: 500,
                  mb: 1,
                  lineHeight: 1,
                }}
              >
                Collaborations
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: { xs: "14px", md: "16px" },
                  maxWidth: "550px",
                  lineHeight: 1.4,
                  mb: 4,
                }}
              >
                We partner with government and non-government organizations to protect Sri Lanka's ecosystems. Through joint efforts, we support conservation, responsible waste management, and community development projects that drive real environmental and social impact.
              </Typography>
              <OrderButton
                href="/contact"
                sx={{
                  backgroundColor: "#ffffff !important",
                  color: "#000000 !important",
                  borderRadius: "50px",
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 400,
                  fontSize: "16px",
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#f0f0f0 !important",
                  }
                }}
                iconBg="#000000"
                iconColor="#ffffff"
              >
                Be a Partner
              </OrderButton>
            </Box>

            <Box sx={{ width: "calc(100% + 96px)", ml: -6, mb: 0 }}>
              <LogoCarousel />
            </Box>
          </Box>

          {/* Card 2: Vision */}
          <Box
            component={FadeIn} delay={0.2}
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)", lg: "1 1 0" },
              backgroundColor: "#95C592",
              backgroundImage: "url(/Assets/CardOverlay2.svg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "40px",
              p: { xs: 4, md: 5 },
              display: "flex",
              flexDirection: "column",
              minHeight: { xs: "400px", md: "450px", lg: "550px" },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: poppins.style.fontFamily,
                color: "#ffffff",
                fontSize: { xs: "2.5rem", md: "clamp(2.5rem, 4vw, 3.5rem)", lg: "4rem" },
                fontWeight: 500,
                mb: 3,
                lineHeight: 1,
              }}
            >
              Vision
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                color: "rgba(255, 255, 255, 0.95)",
                fontSize: { xs: "14px", md: "15px" },
                lineHeight: 1.5,
              }}
            >
              To popularize all the polythene and plastic thrown away from daily
              consumption in Sri Lanka as a reusable industrial raw material and
              by the year 2030 to completely stop every piece of polythene and
              plastic thrown away in the Kalutara district from joining the
              environment, and to create indirect and direct employment
              opportunities by turning it into a reusable raw material and the
              national economy that is booming due to polythene and plastic. Our
              vision is to provide a sustainable solution to the problem of
              waste disposal.
            </Typography>
          </Box>

          {/* Card 3: Mission */}
          <Box
            component={FadeIn} delay={0.3}
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)", lg: "1 1 0" },
              backgroundColor: "#527F65",
              backgroundImage: "url(/Assets/CardOverlay2.svg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "40px",
              p: { xs: 4, md: 5 },
              display: "flex",
              flexDirection: "column",
              minHeight: { xs: "400px", md: "450px", lg: "550px" },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: poppins.style.fontFamily,
                color: "#ffffff",
                fontSize: { xs: "2.5rem", md: "clamp(2.5rem, 4vw, 3.5rem)", lg: "4rem" },
                fontWeight: 500,
                mb: 3,
                lineHeight: 1,
              }}
            >
              Mission
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: { xs: "14px", md: "16px" },
                lineHeight: 1.5,
              }}
            >
              Educating the community and developing methods to collect discarded
              polythene plastics, collecting them, cleaning and sorting them into
              reusable raw materials, identifying the necessary technology and
              methods, and using them to introduce new products to the market
              and move towards our vision.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
